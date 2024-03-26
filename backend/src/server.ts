import express from "express";
import DB from "./config/db";
import redisClient from "./config/redisDB";
import mongoose from 'mongoose';
require('dotenv').config()

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
// const uri: string =`${process.env.DB_URL}`;
// console.log(uri);

// mongoose.connect(`${process.env.DB_URL}`)
// .then((result)=>{
//     console.log('Connected to db');
//     app.listen(PORT);
// })
// .catch((err)=> console.log(err));


app.listen(PORT, () => {
  DB.connected()
    .then((res) => {
      console.log("DB connection successful");
    })
    .catch((err) => {
      console.log("DB connection failed", err);
    });

  // redisClient
  //   .connected()
  //   .then((res) => {
  //     console.log("Redis connection successful");
  //   })
  //   .catch((err) => {
  //     console.log("Redis connection failed", err);
  //   });
  console.log(`Server is running on port ${PORT}`);
  });

export default app;
