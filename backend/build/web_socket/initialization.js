"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketIo = require('socket.io');
let io;
const initializeSocket = (server) => {
    io = SocketIo(server);
    io.on('connection', connection);
    return io;
};
const connection = (socket) => {
    console.log('A websocket is connected', socket.id);
    socket.on(`meeting_meetingId`, () => { });
};
