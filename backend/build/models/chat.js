"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const chatSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    room: [{
            type: Schema.Types.ObjectId,
            ref: 'Room'
        }]
}, { timestamps: true });
const Chat = mongoose_1.default.model("Chat", chatSchema);
exports.default = Chat;
