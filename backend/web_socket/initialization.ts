import { Socket } from "socket.io";

const SocketIo = require('socket.io');

let io;

const initializeSocket = ( server:Socket)=>{
    io = SocketIo(server);
    io.on('connection', connection);
    return io;
}

const connection = (socket:Socket)=>{
    console.log('A websocket is connected', socket.id);

    socket.on(`meeting_meetingId`, ()=>{});
};