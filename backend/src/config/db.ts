import mongoose from "mongoose";
require("dotenv").config();

class DB {
  constructor() {
    const uri: string =`${process.env.DB_CONNECTION}`;
    console.log(uri);
    try {
      mongoose.connect(uri, { autoIndex: true });
    } catch (error) {
      console.error(error);
    }
  }

  async connected(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      mongoose.connection.once("open", () => {
        resolve(true);
      });
      mongoose.connection.on("error", err => {
        reject(err);
      });
    });
  }
}

const mongoDB: DB = new DB();
export default mongoDB;
