import { timeStamp } from "console";
import mongoose from "mongoose";
const Schema = mongoose.Schema;


const meetingSchema = new Schema(
    {
        teams:{
            // a list of user id.
            type: [String],
            required: true,
        },
        startTime:{
            type: Date,
            require: true,
        },
        endTime:{
            type: Date,
            require: true,
        }
    }
    ,{timestamps: true},
);

// model
const Meeting = mongoose.model('Meeting', meetingSchema);
//export
module.exports = Meeting;