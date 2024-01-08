"use server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "..";
import Priority from "../models/priority.model";
import { CreatePriorityParams } from "@/types";

export const createPriority = async ({
  priorityName,
}: CreatePriorityParams) => {
  try {
    await connectToDatabase();

    const newPriority = await Priority.create({ name: priorityName });

    return JSON.parse(JSON.stringify(newPriority));
  } catch (error) {
    handleError(error);
  }
};

export const getAllPriorities = async () => {
  try {
    await connectToDatabase();

    const priorities = await Priority.find();

    return JSON.parse(JSON.stringify(priorities));
  } catch (error) {
    handleError(error);
  }
};

export const getPriorityById = async (priorityId: string) => {
  try {
    await connectToDatabase();

    const priority = await Priority.findById(priorityId);

    return JSON.parse(JSON.stringify(priority));
  } catch (error) {
    console.log(error);
  }
};
