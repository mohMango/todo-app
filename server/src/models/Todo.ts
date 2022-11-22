import mongoose, { Document, Schema } from "mongoose";

export interface ITodo {
  text: string;
  done: boolean;
  user: string;
}

export interface ITodoModel extends ITodo, Document { }

const TodoSchema: Schema = new Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

export default mongoose.model<ITodoModel>("Todo", TodoSchema);
