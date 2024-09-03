"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const roomSchema = new Schema({
    roomID: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    socketID: {
        type: String,
        required: true
    },
    restricted: {
        type: Boolean,
        required: true,
        default: false
    },
    invitedUsers: {
        type: Schema.Types.ObjectId,
        ref: 'Invite',
        default: null,
    },
}, { timestamps: true });
// model
const Room = mongoose_1.default.model("Room", roomSchema);
exports.default = Room;
