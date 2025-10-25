import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);

app.listen(port, () => {
  connectDatabase();
  console.log(`Server is listening to port ${port}`);
});
