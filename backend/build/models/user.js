"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: { type: String, required: true },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
