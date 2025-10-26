import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import apiResponse from "./API/gemini.js";

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

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", async (req, res) => {
  let prompt = req.query.prompt;
  let data = await apiResponse(prompt);
  res.json(data);
});

app.listen(port, () => {
  connectDatabase();
  console.log(`Server is listening to port ${port}`);
});
