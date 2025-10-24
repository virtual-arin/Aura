import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  connectDatabase();
  console.log(`Server is listening to port ${port}`);
});
