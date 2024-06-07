import express from "express";
import DB from "./config/db";
import userRoutes from "./routes/user";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "https";
import Room from "./models/room";
import authenticateToken from "./utils/validateUser";
import User from "./models/user";
import mail from "./config/mailservice";
import mailRoutes from "./routes/mail";
import fs from "fs";
import path from "path";
require("dotenv").config();

const PORT = process.env.PORT || 443;
// const allowUrl = "https://teamsphere-1-y8kv.onrender.com";
const allowUrl = "https://192.168.43.175:3000";
const app = express();
const certdir = "C:/Users/HP ZBOOK X360 G5/Documents/https";

const options = {
  key: fs.readFileSync(path.join(certdir, "localhost.key")),
  cert: fs.readFileSync(path.join(certdir, "localhost.pem")),
  passphrase: "Golden"
};

const httpServer = createServer(options, app);

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
app.use("/mail", mailRoutes);

io.on("connection", (socket) => {
  let user: any = "";
  //@ts-ignore
  let roomID: any = socket.room;
  //@ts-ignore
  if (socket.user) {
    //@ts-ignore
    user = socket.user.id.toString();
  } else {
    socket.emit("notauthorized");
    return;
  }

  socket.on("joinroom", async (roomID) => {
    try {
      const roomsLength = await Room.countDocuments({
        roomID,
        active: true,
        user: { $ne: user },
      });
      if (roomsLength === 4) {
        socket.emit("roomfull");
        return;
      }

      const userInRoom = await Room.findOne({ user, roomID, active: true });

      if (userInRoom) {
        //@ts-ignore
        socket.emit("alreadyinroom", socket.user);
        return;
      }

      const userInRoomInactive = await Room.findOne({
        user,
        roomID,
        active: false,
      });

      if (userInRoomInactive) {
        await Room.findOneAndUpdate(
          { user, roomID },
          { $set: { active: true } },
          { new: true }
        );
      } else {
        await Room.create({ roomID, user, socketID: socket.id });
      }

      const usersInThisRoom = await Room.find({
        roomID,
        user: { $ne: user },
        active: true,
      });
      socket.emit("connectedUsers", usersInThisRoom);
    } catch (error: any) {
      console.error("Error in joinroom:", error);
      socket.emit("joinroomError", error.message);
    }
  });

  socket.on("sendSignal", ({ userToSignal, callerID, signal }) => {
    io.to(userToSignal).emit("userJoined", { signal, callerID });
  });

  socket.on("returnSignal", ({ signal, callerID }) => {
    io.to(callerID).emit("receiveReturnSignal", { signal, id: socket.id });
  });

  socket.on("endcall", async () => {
    const usersInThisRoom = await Room.find({
      roomID,
      user: { $ne: user },
      active: true,
    });

    const userRoomID = await Room.findOne({
      user,
      roomID,
      active: true,
    });

    const id = userRoomID?.socketID;

    usersInThisRoom.forEach(({ socketID }) => {
      io.to(socketID).emit("receiveEndCall", { id });
    });
    socket.disconnect();
  });

  socket.on("disconnect", async () => {
    try {
      await Room.deleteOne({ user, roomID });
      // await Room.findOneAndUpdate(
      //   { user, roomID },
      //   { $set: { active: false } },
      //   { new: true }
      // );

      // io.to()emit("userDisconnected", { user }); to do set user rom in authenticated so that it can destroy peer in room
    } catch (error) {
      console.error("Error handling disconnect:", error);
    }
  });
});

httpServer.listen(PORT, () => {
  DB.connected()
    .then((res) => {
      console.log("DB connection successful");
    })
    .catch((err) => {
      console.error("DB connection failed", err);
    });
  mail;
  console.log(`Server is running on port ${PORT}`);
});

export default app;
