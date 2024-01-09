"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import Category from "../models/category.model";
import {
  CreateNoteParams,
  DeleteNoteParams,
  GetAllNotesParams,
  UpdateNoteParams,
} from "@/types";
import Note from "../models/note.model";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateNote = (query: any) => {
  return query
    .populate({
      path: "creator",
      model: User,
      select: "_id firstName lastName username",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// CREATE
export async function createNote({ userId, note, path }: CreateNoteParams) {
  try {
    await connectToDatabase();

    const creator = await User.findById(userId);
    if (!creator) throw new Error("Creator not found");

    const newNote = await Note.create({
      ...note,
      category: note.categoryId,
      creator: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newNote));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE NOTE BY ID
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

export async function updateNote({ userId, note, path }: UpdateNoteParams) {
  try {
    await connectToDatabase();

    const noteToUpdate = await Note.findById(note._id);

    if (!noteToUpdate || noteToUpdate.creator.toHexString() !== userId) {
      throw new Error("Unauthorized or note not found");
    }

    const updatedNote = await Note.findByIdAndUpdate(
      note._id,
      { ...note, category: note.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedNote));
  } catch (error) {
    handleError(error);
  }
}

// Get all notes
export async function getAllNotes({
  query,
  creator,
  limit = 6,
  page,
  category,
}: GetAllNotesParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const creatorCondition = creator ? { creator: creator } : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
        creatorCondition ? { creator: creatorCondition.creator } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const meetsQuery = Note.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const notes = await populateNote(meetsQuery);
    const notesCount = await Note.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(notes)),
      totalPages: Math.ceil(notesCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteNote({ noteId, path }: DeleteNoteParams) {
  try {
    await connectToDatabase();

    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (deletedNote) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}
