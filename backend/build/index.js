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
// import { createServer } from "https";
const room_1 = __importDefault(require("./models/room"));
const validateUser_1 = __importDefault(require("./utils/validateUser"));
const mail_1 = __importDefault(require("./routes/mail"));
require("dotenv/config");
const redisDB_1 = __importDefault(require("./config/redisDB"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 443;
const allowUrl = "https://192.168.76.163:3000";
// const allowUrl = "https://teamsphere-1-y8kv.onrender.com";
// const certdir = "C:\\Users\\adeni\\Documents\\Cert\\";
// const options = {
//   key: fs.readFileSync(`${certdir}localhost.key`),
//   cert: fs.readFileSync(`${certdir}localhost.crt`),
//   passphrase: process.env.CERT_PASSWORD
// };
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
// const httpServer = createServer(options, app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [allowUrl],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
app.use((0, cors_1.default)({ origin: allowUrl, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../frontend/build', 'index.html'));
});
app.get("/", (req, res) => {
    return res.json({ hello: "world" });
});
app.use("/user", user_1.default);
app.use("/mail", mail_1.default);
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
io.on("connection", (socket) => {
    let user = "";
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
            const roomsLength = yield room_1.default.countDocuments({
                roomID,
                active: true,
                user: { $ne: user },
            });
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
    socket.on("endcall", () => __awaiter(void 0, void 0, void 0, function* () {
        const usersInThisRoom = yield room_1.default.find({
            roomID,
            user: { $ne: user },
            active: true,
        });
        const userRoomID = yield room_1.default.findOne({
            user,
            roomID,
            active: true,
        });
        const id = userRoomID === null || userRoomID === void 0 ? void 0 : userRoomID.socketID;
        usersInThisRoom.forEach(({ socketID }) => {
            io.to(socketID).emit("receiveEndCall", { id });
        });
        socket.disconnect();
    }));
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield room_1.default.deleteOne({ user, roomID });
            // await Room.findOneAndUpdate(
            //   { user, roomID },
            //   { $set: { active: false } },
            //   { new: true }
            // );
            // io.to()emit("userDisconnected", { user }); to do set user rom in authenticated so that it can destroy peer in room
        }
        catch (error) {
            console.error("Error handling disconnect:", error);
        }
    }));
});
server.listen(PORT, () => {
    db_1.default.connected().catch(console.dir);
    redisDB_1.default.connected().catch(console.dir);
    console.log(`Server is running on port http://localhost:${PORT}`);
});
exports.default = app;
