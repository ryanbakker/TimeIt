"use server";

import { handleError } from "@/lib/utils";
import Priority from "../models/priority.model";
import User from "../models/user.model";
import { connectToDatabase } from "..";
import {
  CreateTaskParams,
  DeleteTaskParams,
  GetAllTasksParams,
  UpdateTaskParams,
} from "@/types";
import Task from "../models/task.model";
import { revalidatePath } from "next/cache";

const getPriorityByName = async (name: string) => {
  return Priority.findOne({ name: { $regex: name, $options: "i" } });
};

const populateTask = (query: any) => {
  return query
    .populate({
      path: "creator",
      model: User,
      select: "_id firstName lastName username",
    })
    .populate({ path: "priority", model: Priority, select: "_id name" });
};

// Create
export async function createTask({ userId, task, path }: CreateTaskParams) {
  try {
    await connectToDatabase();

    const creator = await User.findById(userId);
    if (!creator) throw new Error("Creator not found");

    const newTask = await Task.create({
      ...task,
      priority: task.priorityId,
      creator: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newTask));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE Task BY ID
export async function getTaskById(taskId: string) {
  try {
    await connectToDatabase();

    const task = await populateTask(Task.findById(taskId));

    if (!task) throw new Error("Task not found");

    return JSON.parse(JSON.stringify(task));
  } catch (error) {
    handleError(error);
  }
}

export async function updateTask({ userId, task, path }: UpdateTaskParams) {
  try {
    await connectToDatabase();

    const taskToUpdate = await Task.findById(task._id);

    if (!taskToUpdate || taskToUpdate.creator.toHexString() !== userId) {
      throw new Error("Unauthorized or task not found");
    }

    const updatedTask = await Task.findByIdAndUpdate(
      task._id,
      { ...task, priority: task.priorityId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedTask));
  } catch (error) {
    handleError(error);
  }
}

// Get all tasks
export async function getAllTasks({
  query,
  creator,
  limit = 6,
  page,
  priority,
}: GetAllTasksParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const priorityCondition = priority
      ? await getPriorityByName(priority)
      : null;
    const creatorCondition = creator ? { creator: creator } : null;
    const conditions = {
      $and: [
        titleCondition,
        priorityCondition ? { priority: priorityCondition._id } : {},
        creatorCondition ? { creator: creatorCondition.creator } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const meetsQuery = Task.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const tasks = await populateTask(meetsQuery);
    const tasksCount = await Task.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(tasks)),
      totalPages: Math.ceil(tasksCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteTask({ taskId, path }: DeleteTaskParams) {
  try {
    await connectToDatabase();

    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (deletedTask) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}
