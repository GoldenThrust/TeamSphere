import mongoose from "mongoose";
import { Dev } from "../utils/constants"
import "dotenv/config";

class DB {
  uri;

  constructor() {
    this.uri = Dev ? "mongodb://0.0.0.0:27017/TeamSphere" : `${process.env.DB_CONNECTION}`;
  }

  async connected() {
    try {
      await mongoose.connect(this.uri, {
        autoIndex: true,
      });

      console.log("Successfully connected to MongoDB!");
    } catch (error) {
      console.error(error);
    }
  }
}

const mongoDB: DB = new DB();
export default mongoDB;
