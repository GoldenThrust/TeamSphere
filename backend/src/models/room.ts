import mongoose from "mongoose";
import User from "./chat";

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }]
  },
  { timestamps: true }
);

// model
const Room = mongoose.model("Room", roomSchema);

export default Room;