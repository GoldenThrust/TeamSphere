"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const room_1 = __importDefault(require("./models/room"));
const validateUser_1 = __importDefault(require("./utils/validateUser"));
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const allowUrl = "http://localhost:3000";
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: [allowUrl],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
app.use((0, cors_1.default)({ origin: allowUrl, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
io.use((socket, next) => {
    //@ts-ignore
    (0, cookie_parser_1.default)(process.env.COOKIE_SECRET)(socket.request, {}, (err) => {
        if (err) {
            console.error("Error parsing cookie:", err);
            return next(err);
        }
        next();
    });
});
io.use(validateUser_1.default);
app.get("/test", (req, res) => {
    res.json({ hello: "world" });
});
app.use("/user", user_1.default);
io.on("connection", (socket) => {
    let user = '';
    //@ts-ignore
    let roomID = socket.room;
    //@ts-ignore
    if (socket.user) {
        //@ts-ignore
        user = socket.user.id.toString();
    }
    else {
        socket.emit("notauthorized");
        return;
    }
    socket.on("joinroom", (roomID) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roomsLength = yield room_1.default.countDocuments({ roomID, active: true, user: { $ne: user } });
            if (roomsLength === 4) {
                socket.emit("roomfull");
                return;
            }
            const userInRoom = yield room_1.default.findOne({ user, roomID, active: true });
            if (userInRoom) {
                //@ts-ignore
                socket.emit("alreadyinroom", socket.user);
                return;
            }
            const userInRoomInactive = yield room_1.default.findOne({
                user,
                roomID,
                active: false,
            });
            if (userInRoomInactive) {
                yield room_1.default.findOneAndUpdate({ user, roomID }, { $set: { active: true } }, { new: true });
            }
            else {
                yield room_1.default.create({ roomID, user, socketID: socket.id });
            }
            const usersInThisRoom = yield room_1.default.find({
                roomID,
                user: { $ne: user },
                active: true,
            });
            socket.emit("connectedUsers", usersInThisRoom);
        }
        catch (error) {
            console.error("Error in joinroom:", error);
            socket.emit("joinroomError", error.message);
        }
    }));
    socket.on("sendSignal", ({ userToSignal, callerID, signal }) => {
        io.to(userToSignal).emit("userJoined", { signal, callerID });
    });
    socket.on("returnSignal", ({ signal, callerID }) => {
        io.to(callerID).emit("receiveReturnSignal", { signal, id: socket.id });
    });
    socket.on("endcall", () => {
    });
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Room.deleteOne({ user })
            yield room_1.default.findOneAndUpdate({ user, roomID }, { $set: { active: false } }, { new: true });
            //@ts-ignore
            console.log("disconnected successfully", socket.room, socket.user.email);
            // io.to()emit("userDisconnected", { user }); to do set user rom in authenticated so that it can destroy peer in room
        }
        catch (error) {
            console.error("Error handling disconnect:", error);
        }
    }));
});
httpServer.listen(PORT, () => {
    db_1.default.connected()
        .then((res) => {
        console.log("DB connection successful");
    })
        .catch((err) => {
        console.log("DB connection failed", err);
    });
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
