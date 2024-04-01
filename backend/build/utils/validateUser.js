"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
function authenticateToken(socket, next) {
    const token = socket.request.signedCookies[constants_1.COOKIE_NAME];
    const roomID = socket.handshake.query.roomId;
    if (!token || token.trim() === "") {
        return next();
    }
    try {
        const jwtSecret = process.env.JWT_SECRET;
        //@ts-ignore
        const jwtData = jsonwebtoken_1.default.verify(token, jwtSecret);
        socket.user = jwtData;
        socket.room = roomID;
        return next();
    }
    catch (error) {
        return console.log(error);
    }
}
exports.default = authenticateToken;
