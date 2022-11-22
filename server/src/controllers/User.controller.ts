import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User";

export const register = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email: email });
    if (Object.keys(user).length !== 0) {
      return res.status(400).json({ message: "user already exists" });
    }

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, "very secret key");
    res.status(201).json({ token });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};
export const login = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(500).json({ message: "password incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "very secret key");
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};
