import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  dateTime: Date;
  creator: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  dateTime: { type: Date, required: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
