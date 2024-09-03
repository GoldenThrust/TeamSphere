"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenManager_1 = require("../middleware/tokenManager");
const multer_1 = __importDefault(require("multer"));
const mailerControllers_1 = __importDefault(require("../controllers/mailerControllers"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const mailRoutes = (0, express_1.Router)();
mailRoutes.post("/sendmail", tokenManager_1.verifyToken, mailerControllers_1.default.sendMail);
exports.default = mailRoutes;
