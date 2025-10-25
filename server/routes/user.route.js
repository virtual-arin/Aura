import express from "express";
import { currentUser } from "../controllers/user.controller.js";
import authenticated from "../middlewares/authenticated.js";

const userRouter = express.Router();

userRouter.get("/current", authenticated, currentUser);

export default userRouter;
