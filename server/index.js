import express from "express";
import route from "./route/userRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/user", route);

app.listen(4000, () => {
  console.log("jalan cuy");
});
