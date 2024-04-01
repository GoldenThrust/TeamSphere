import mongoose from "mongoose";
import User from "./chat";
import Invite from "./invitation";
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

// model
const Room = mongoose.model("Room", roomSchema);

export default Room;
