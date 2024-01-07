import { Document, Schema, model, models } from "mongoose";

export interface IGrade extends Document {
  _id: string;
  assignment: string;
  letter: string;
  credits: number;
  creator: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}

const GradeSchema = new Schema({
  assignment: { type: String, required: true },
  credits: { type: Number, required: true },
  letter: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Grade = models.Grade || model("Grade", GradeSchema);

export default Grade;
