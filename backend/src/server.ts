import express from "express";
import DB from "./config/db";
import userRoutes from "./routes/user";
import cors from "cors";
import cookieParser from "cookie-parser";
import socket from "socket.io";
import { Server } from "socket.io";
import { createServer } from "http";
import Room from "./models/room";
import authenticateToken from "./utils/validateUser";
import User from "./models/user";
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const allowUrl = " http://172.29.203.140:3000";
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [allowUrl],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({ origin: allowUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
io.use((socket, next) => {
  //@ts-ignore
  cookieParser(process.env.COOKIE_SECRET)(socket.request, {}, (err) => {
    if (err) {
      console.error("Error parsing cookie:", err);
      return next(err);
    }

    next();
  });
});

io.use(authenticateToken);

app.get("/test", (req, res) => {
  res.json({ hello: "world" });
});

app.use("/user", userRoutes);

const users: any = {};

const socketToRoom: any = {};
const roomToUsers: any = {};

io.on("connection", (socket) => {
  //@ts-ignore
  const user = socket.user.id.toString();
  socket.on("joinroom", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      const userInroom = roomToUsers[roomID].filter((userID: any) => userID === user);
      
      if (userInroom.length > 0) {
        socket.emit("alreadyinroom");
        return;
      }
      if (length === 4) {
        socket.emit("roomfull");
        return;
      }
      users[roomID].push(socket.id);
      roomToUsers[roomID].push(user);
    } else {
      roomToUsers[roomID] = [user];
      users[roomID] = [socket.id];
    }

    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id: any) => id !== socket.id);
    console.log(roomToUsers)

    socket.emit("connectedUsers", usersInThisRoom);
  });

  socket.on("sendSignal", ({ userToSignal, callerID, signal }) => {
    io.to(userToSignal).emit("userJoined", { signal, callerID });
  });

  socket.on("returnSignal", ({ signal, callerID }) => {
    io.to(callerID).emit("receiveReturnSignal", { signal, id: socket.id });
  });

  socket.on("disconnect", () => {});
});

httpServer.listen(PORT, () => {
  DB.connected()
    .then((res) => {
      console.log("DB connection successful");
    })
    .catch((err) => {
      console.log("DB connection failed", err);
    });
  console.log(`Server is running on port ${PORT}`);
});

export default app;
