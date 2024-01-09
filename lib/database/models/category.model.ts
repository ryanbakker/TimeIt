import { Document, Schema, model, models } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
  creator: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
