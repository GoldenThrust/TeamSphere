import mongoose from "mongoose";
import User from "./chat";
import Room from "./room";
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;