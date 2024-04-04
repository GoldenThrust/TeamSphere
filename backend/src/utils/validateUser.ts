import User from "../models/user";
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { COOKIE_NAME } from "./constants";

export default function authenticateToken(socket: any, next: any) {
    const token = socket.request.signedCookies[COOKIE_NAME]
    if (!token || token.trim() === "") {
        console.log("Token Not Received");
        return;
    }

    try {   
      const jwtSecret = process.env.JWT_SECRET;
      //@ts-ignore
      const jwtData = jwt.verify(token, jwtSecret);
      socket.user = jwtData;
      return next();
    } catch (error) {
      return console.log(error);
    }
}