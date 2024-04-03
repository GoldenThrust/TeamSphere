import User from "../models/user";
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { COOKIE_NAME } from "./constants";

export default function authenticateToken(socket: any, next: any) {
  // const token = socket.request.signedCookies[COOKIE_NAME]
  const token = socket.handshake.query.token;
  const roomID = socket.handshake.query.roomId
  if (!token || token.trim() === "") {
    return next();
  }
  
    try {   
      const jwtSecret = process.env.JWT_SECRET;
      //@ts-ignore
      const jwtData = jwt.verify(token, jwtSecret);
      socket.user = jwtData;
      socket.room = roomID;
      return next();
    } catch (error) {
      return next();
      return console.log(error);
    }
}