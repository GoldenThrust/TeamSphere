import express from "express";
import Test from "./models/tests";
import DB from "./config/db";
import redisClient from "./config/redisDB";
import { createClient } from "redis";

const PORT = process.env.PORT || 5000;
const app = express();
let count = 0;
app.use(express.json());

app.get("/api/", (req, res) => {
  const test = new Test({ name: "test", password: count++ });
  test.save();
  Test.find()
    .exec()
    .then((reply) => {
      console.log(reply);
    });

  res.json({
    message: "Hello world",
    test: count,
  });
});
app.listen(PORT, () => {
  const client = createClient();

  client.on("error", (err) => console.log("Redis Client Error", err));

  DB.connected()
    .then((res) => {
      console.log("DB connection successful");
    })
    .catch((err) => {
      console.log("DB connection failed", err);
    });

  redisClient
    .connected()
    .then((res) => {
      console.log("Redis connection successful");
    })
    .catch((err) => {
      console.log("Redis connection failed", err);
    });
  console.log(`Server is running on port ${PORT}`);
});

export default app;
