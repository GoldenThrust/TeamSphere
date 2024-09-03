"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const Schema = mongoose_1.default.Schema;
const inviteSchema = new Schema({
    user: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
    roomID: {
        type: String,
        default: (0, uuid_1.v4)(),
        required: true
    }
}, { timestamps: true });
// model
const Invite = mongoose_1.default.model("Invite", inviteSchema);
exports.default = Invite;
