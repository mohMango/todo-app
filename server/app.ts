import express from "express";
import cors from "cors";
import { userRouter } from "./src/routes/User.routes";
import { todoRouter } from "./src/routes/Todo.routes";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/todo", todoRouter);

app.get("/", (_req, res) => {
  return res.json({ message: "root" });
});
