"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const meetingSchema = new Schema({
    teams: {
        // a list of user id.
        type: [String],
        required: true,
    },
    startTime: {
        type: Date,
        require: true,
    },
    endTime: {
        type: Date,
        require: true,
    }
}, { timestamps: true });
// model
const Meeting = mongoose_1.default.model('Meeting', meetingSchema);
//export
module.exports = Meeting;
