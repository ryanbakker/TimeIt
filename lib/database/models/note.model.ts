import { Document, Schema, model, models } from "mongoose";

export interface INote extends Document {
  _id: string;
  title: string;
  content?: string;
  createdAt: Date;
  category: { _id: string; name: string };
  creator: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Note = models.Note || model("Note", NoteSchema);

export default Note;
