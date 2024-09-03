import User from "../models/user";
import { hash, verify } from "argon2";
import { createToken } from "../middleware/tokenManager";
import { COOKIE_NAME } from "../utils/constants";
import { NextFunction, Request, Response } from "express";


class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();
      return res.status(200).json({ message: "OK", users });
    } catch (error: any) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  }

  async userSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstname, lastname, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(401).send("User already registered");
      const hashedPassword = await hash(password);
      let image = '';
      
      if (req.file) {
        image = req.file.path;
      }

      const user = new User({ firstname, lastname, email, password: hashedPassword, image });
      await user.save();

      res.clearCookie(COOKIE_NAME, {
        secure: true,
        sameSite: "none",
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });

      const token = createToken(user._id.toString(), user.email, "7d");
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      res.cookie(COOKIE_NAME, token, {
        secure: true,
        sameSite: "none",
        httpOnly: true,
        path: "/",
        domain: "localhost",
        expires,
        signed: true,
      });

      const name = user.firstname + " " + user.lastname

      return res
        .status(201)
        .json({ message: "OK", name, email: user.email, cookie: token});
    } catch (error: any) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  }

  async userLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).send("User not registered");
      }
      const isPasswordCorrect = await verify(user.password, password);
      if (!isPasswordCorrect) {
        return res.status(403).send("Incorrect Password");
      }
  
      res.clearCookie(COOKIE_NAME, {
        secure: true,
        sameSite: "none",
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });
  
      const token = createToken(user._id.toString(), user.email, "7d");
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);

      res.cookie(COOKIE_NAME, token, {
        secure: true,
        sameSite: "none",
        httpOnly: true,
        path: "/",
        domain: "localhost",
        expires,
        signed: true,
      });


      const name = user.firstname + " " + user.lastname

      return res
        .status(200)
        .json({ message: "OK", name, email: user.email, cookie: token });
    } catch (error: any) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  
  async verifyUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }

      const name = user.firstname + " " + user.lastname

      return res
        .status(200)
        .json({ message: "OK", name, email: user.email });
    } catch (error: any) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  }

  async userLogout(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
  
      res.clearCookie(COOKIE_NAME, {
        secure: true,
        sameSite: "none",
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });

      const name = user.firstname + " " + user.lastname
  
      return res
        .status(200)
        .json({ message: "OK", name, email: user.email });
    } catch (error: any) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  }  
}

const userContoller = new UserController();

export default userContoller;