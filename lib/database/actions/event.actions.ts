"use server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "..";
import User from "../models/user.model";
import Event from "../models/event.model";
import { revalidatePath } from "next/cache";

type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description?: string;
    dateTime: Date;
  };
  path: string;
};

type DeleteEventParams = {
  eventId: string;
  path: string;
};

export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase();

    const creator = await User.findById(userId);
    if (!creator) throw new Error("Creator not found");

    const newEvent = await Event.create({
      ...event,
      creator: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}

type GetAllEventsParams = {
  creator: any;
};

const populateEvent = (query: any) => {
  return query.populate({
    path: "creator",
    mode: Event,
    select: "_id firstName lastName username",
  });
};

export async function getAllEventsByUser({ creator }: GetAllEventsParams) {
  try {
    await connectToDatabase();

    const creatorCondition = creator ? { creator: creator } : null;
    const conditions = {
      $and: [creatorCondition ? { creator: creatorCondition.creator } : {}],
    };

    const eventsQuery = Event.find(conditions).sort({ createdAt: "asc" });

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return { data: JSON.parse(JSON.stringify(events)) };
  } catch (error) {
    handleError(error);
  }
}

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}
