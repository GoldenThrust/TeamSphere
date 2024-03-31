import mongoose from "mongoose";
import User from "./chat";

const Schema = mongoose.Schema;

const inviteSchema = new Schema(
    {
      user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }],
    },
    { timestamps: true }
);

// model
const Invite = mongoose.model("Invite", inviteSchema);

export default Invite;
