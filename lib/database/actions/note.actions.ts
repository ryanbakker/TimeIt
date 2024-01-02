"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import Category from "../models/category.model";
import { CreateNoteParams } from "@/types";
import Note from "../models/note.model";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateNote = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName username",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// CREATE
export async function createNote({ userId, note, path }: CreateNoteParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newNote = await Note.create({
      ...note,
      category: note.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newNote));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE MEET BY ID
export async function getNoteById(noteId: string) {
  try {
    await connectToDatabase();

    const note = await populateNote(Note.findById(noteId));

    if (!note) throw new Error("Note not found");

    return JSON.parse(JSON.stringify(note));
  } catch (error) {
    handleError(error);
  }
}
