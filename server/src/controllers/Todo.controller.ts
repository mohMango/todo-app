import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Todo from "../models/Todo";

export const createTodo = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { text } = req.body;
  //@ts-ignore
  const user = req.id;
  try {
    const todo = new Todo({
      _id: new mongoose.Types.ObjectId(),
      text,
      user,
    });
    await todo.save();
    res.status(201).json({ data: [todo] });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  //@ts-ignore
  const user = req.id;
  try {
    const todo = await Todo.find({ user: user });
    res.status(200).json({ data: todo });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.set(req.body);
    await todo.save();
    res.status(200).json({ data: todo });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
