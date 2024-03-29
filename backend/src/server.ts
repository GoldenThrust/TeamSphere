import express from "express";
import DB from "./config/db";
import userRoutes from "./routes/user";
import cors from "cors";
import cookieParser from "cookie-parser";
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({ origin: "https://teamsphere-1-y8kv.onrender.com", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


app.listen(PORT, () => {
  DB.connected()
    .then((res) => {
      console.log("DB connection successful");
    })
    .catch((err) => {
      console.log("DB connection failed", err);
    });
  console.log(`Server is running on port ${PORT}`);
});

app.get("/test", (req, res) => {
  res.json({ hello: "world" });
});

// ..... Routes ......
app.use("/user", userRoutes);

export default app;