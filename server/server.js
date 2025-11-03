import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./src/config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.route.js";
import cors from "cors";

const app = express();

dotenv.config();

const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome back arin!");
});

app.listen(port, () => {
  connectDatabase();
  console.log(`Server is listening to port ${port}`);
});
