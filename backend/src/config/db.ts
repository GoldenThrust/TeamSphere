import mongoose from "mongoose";
require("dotenv").config();

class DB {
  constructor() {
    const isProduction: boolean = process.env.PRODUCTION === 'true';
    const db: string = process.env.DB_CONNECTION || 'mongodb';
    const host: string = process.env.DB_HOST || 'localhost';
    const port: string | number = process.env.DB_PORT || 27017;
    const database: string = process.env.DB_DATABASE || 'TeamSphere';
    const uri: string = isProduction ? `${process.env.DB_CONNECTION}` : `${db}://${host}:${port}/${database}`;
    console.log()
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
