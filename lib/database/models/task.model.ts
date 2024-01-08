import { Document, Schema, model, models } from "mongoose";

export interface ITask extends Document {
  _id: string;
  title: string;
  description?: string;
  deadline: Date;
  createdAt: Date;
  priority: { _id: string; name: string };
  creator: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date, required: Date.now },
  createdAt: { type: Date, default: Date.now },
  priority: { type: Schema.Types.ObjectId, ref: "Priority" },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;
