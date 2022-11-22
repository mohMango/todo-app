import express from "express";
import {
  createTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
} from "../controllers/Todo.controller";
import { auth } from "../middleware/auth.middleware";

export const todoRouter = express.Router();

todoRouter.get("/", auth, getAllTodos);
todoRouter.post("/create", auth, createTodo);
todoRouter.patch("/update/:id", auth, updateTodo);
todoRouter.delete("/delete/:id", auth, deleteTodo);
