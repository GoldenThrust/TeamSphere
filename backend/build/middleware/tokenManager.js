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
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
function createToken(id, email, expiresIn) {
    const payload = { id, email };
    const jwtSecret = process.env.JWT_SECRET;
    //@ts-ignore
    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, {
        expiresIn,
    });
    return token;
}
exports.createToken = createToken;
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.signedCookies[constants_1.COOKIE_NAME];
        if (!token || token.trim() === "") {
            return res.status(401).json({ message: "Token Not Received" });
        }
        try {
            const jwtSecret = process.env.JWT_SECRET;
            //@ts-ignore
            const jwtData = jsonwebtoken_1.default.verify(token, jwtSecret);
            res.locals.jwtData = jwtData;
            return next();
        }
        catch (error) {
            return res.status(401).json({ message: "Token Expired or Invalid" });
        }
    });
}
exports.verifyToken = verifyToken;
