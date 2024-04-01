"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const validators_1 = require("../middleware/validators");
const tokenManager_1 = require("../middleware/tokenManager");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", userControllers_1.default.getAllUsers);
userRoutes.post("/create", upload.single('image'), (0, validators_1.validate)(validators_1.signupValidator), userControllers_1.default.userSignup);
userRoutes.post("/login", (0, validators_1.validate)(validators_1.loginValidator), userControllers_1.default.userLogin);
userRoutes.get("/auth-status", tokenManager_1.verifyToken, userControllers_1.default.verifyUser);
userRoutes.get("/logout", tokenManager_1.verifyToken, userControllers_1.default.userLogout);
exports.default = userRoutes;
