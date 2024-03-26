import express from 'express';
import DB from './config/db';
require('dotenv').config()

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

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
