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
const user_1 = __importDefault(require("../models/user"));
const argon2_1 = require("argon2");
const tokenManager_1 = require("../middleware/tokenManager");
const constants_1 = require("../utils/constants");
class UserController {
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find();
                return res.status(200).json({ message: "OK", users });
            }
            catch (error) {
                console.log(error);
                return res.status(200).json({ message: "ERROR", cause: error.message });
            }
        });
    }
    userSignup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstname, lastname, email, password } = req.body;
                const existingUser = yield user_1.default.findOne({ email });
                if (existingUser)
                    return res.status(401).send("User already registered");
                const hashedPassword = yield (0, argon2_1.hash)(password);
                let image = '';
                if (req.file) {
                    image = req.file.path;
                }
                const user = new user_1.default({ firstname, lastname, email, password: hashedPassword, image });
                yield user.save();
                res.clearCookie(constants_1.COOKIE_NAME, {
                    secure: true,
                    sameSite: "none",
                    httpOnly: true,
                    domain: "localhost",
                    signed: true,
                    path: "/",
                });
                const token = (0, tokenManager_1.createToken)(user._id.toString(), user.email, "7d");
                const expires = new Date();
                expires.setDate(expires.getDate() + 7);
                res.cookie(constants_1.COOKIE_NAME, token, {
                    secure: true,
                    sameSite: "none",
                    httpOnly: true,
                    path: "/",
                    domain: "localhost",
                    expires,
                    signed: true,
                });
                const name = user.firstname + " " + user.lastname;
                return res
                    .status(201)
                    .json({ message: "OK", name, email: user.email, cookie: token });
            }
            catch (error) {
                console.log(error);
                return res.status(200).json({ message: "ERROR", cause: error.message });
            }
        });
    }
    userLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_1.default.findOne({ email });
                if (!user) {
                    return res.status(401).send("User not registered");
                }
                const isPasswordCorrect = yield (0, argon2_1.verify)(user.password, password);
                if (!isPasswordCorrect) {
                    return res.status(403).send("Incorrect Password");
                }
                res.clearCookie(constants_1.COOKIE_NAME, {
                    secure: true,
                    sameSite: "none",
                    httpOnly: true,
                    domain: "localhost",
                    signed: true,
                    path: "/",
                });
                const token = (0, tokenManager_1.createToken)(user._id.toString(), user.email, "7d");
                const expires = new Date();
                expires.setDate(expires.getDate() + 7);
                res.cookie(constants_1.COOKIE_NAME, token, {
                    secure: true,
                    sameSite: "none",
                    httpOnly: true,
                    path: "/",
                    domain: "localhost",
                    expires,
                    signed: true,
                });
                const name = user.firstname + " " + user.lastname;
                return res
                    .status(200)
                    .json({ message: "OK", name, email: user.email, cookie: token });
            }
            catch (error) {
                console.log(error);
                return res.status(200).json({ message: "ERROR", cause: error.message });
            }
        });
    }
    ;
    verifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(res.locals.jwtData.id);
                if (!user) {
                    return res.status(401).send("User not registered OR Token malfunctioned");
                }
                if (user._id.toString() !== res.locals.jwtData.id) {
                    return res.status(401).send("Permissions didn't match");
                }
                const name = user.firstname + " " + user.lastname;
                return res
                    .status(200)
                    .json({ message: "OK", name, email: user.email });
            }
            catch (error) {
                console.log(error);
                return res.status(200).json({ message: "ERROR", cause: error.message });
            }
        });
    }
    userLogout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //user token check
                const user = yield user_1.default.findById(res.locals.jwtData.id);
                if (!user) {
                    return res.status(401).send("User not registered OR Token malfunctioned");
                }
                if (user._id.toString() !== res.locals.jwtData.id) {
                    return res.status(401).send("Permissions didn't match");
                }
                res.clearCookie(constants_1.COOKIE_NAME, {
                    secure: true,
                    sameSite: "none",
                    httpOnly: true,
                    domain: "localhost",
                    signed: true,
                    path: "/",
                });
                const name = user.firstname + " " + user.lastname;
                return res
                    .status(200)
                    .json({ message: "OK", name, email: user.email });
            }
            catch (error) {
                console.log(error);
                return res.status(200).json({ message: "ERROR", cause: error.message });
            }
        });
    }
}
const userContoller = new UserController();
exports.default = userContoller;
