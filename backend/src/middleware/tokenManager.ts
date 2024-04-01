import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { COOKIE_NAME } from "../utils/constants";

export function createToken(id: string, email: string, expiresIn: string) {
  const payload = { id, email };
  const jwtSecret = process.env.JWT_SECRET;
  //@ts-ignore
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn,
  });

  return token;
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.signedCookies[COOKIE_NAME];
  // const token = req.body.token;
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  try {
    const jwtSecret = process.env.JWT_SECRET;
    //@ts-ignore
    const jwtData = jwt.verify(token, jwtSecret);
    res.locals.jwtData = jwtData;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token Expired or Invalid" });
  }
}
