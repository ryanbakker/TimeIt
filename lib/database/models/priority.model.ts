import { Document, Schema, model, models } from "mongoose";

export interface IPriority extends Document {
  _id: string;
  name: string;
}

const PrioritySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Priority = models.Priority || model("Priority", PrioritySchema);

export default Priority;
