import express from "express";
import { login, register } from "../controllers/User.controller";

export const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
