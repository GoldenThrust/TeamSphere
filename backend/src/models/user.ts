import { timeStamp } from "console";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true
    },
    image:{
        type:String
    }
  },
  { timestamps: true }
);

// model
const User = mongoose.model("User", userSchema);
// export
module.exports = User;
