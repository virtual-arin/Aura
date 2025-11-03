import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./src/config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.route.js";
const app = express();

dotenv.config();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome back arin!");
});

app.listen(port, () => {
  connectDatabase();
  console.log(`Server is listening to port ${port}`);
});
