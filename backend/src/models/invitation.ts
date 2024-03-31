import mongoose from "mongoose";
import User from "./chat";
import { v4 as uuid } from "uuid";

const Schema = mongoose.Schema;

const inviteSchema = new Schema(
    {
      user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }],
      roomID: {
        type: String,
        default: uuid(),
        required: true
      }
    },
    { timestamps: true }
);

// model
const Invite = mongoose.model("Invite", inviteSchema);

export default Invite;
