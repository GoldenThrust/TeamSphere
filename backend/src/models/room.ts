import mongoose from "mongoose";
import User from "./chat";

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
    }
  },
  { timestamps: true }
);

// model
const Room = mongoose.model("Room", roomSchema);

export default Room;
