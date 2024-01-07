import { Document, Schema, model, models } from "mongoose";

export interface ILetter extends Document {
  _id: string;
  grade: string;
}

const LetterSchema = new Schema({
  grade: { type: String, required: true, unique: true },
});

const Letter = models.Letter || model("Letter", LetterSchema);

export default Letter;
