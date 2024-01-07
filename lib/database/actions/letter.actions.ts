"use server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "..";
import Letter from "../models/letter.model";

type CreateLetterParams = {
  letterGrade: string;
};

export const createLetter = async ({ letterGrade }: CreateLetterParams) => {
  try {
    await connectToDatabase();

    const newLetter = await Letter.create({ letterGrade: letterGrade });

    return JSON.parse(JSON.stringify(newLetter));
  } catch (error) {
    console.log(error);
  }
};

export const getAllLetters = async () => {
  try {
    await connectToDatabase();

    const letters = await Letter.find();

    return JSON.parse(JSON.stringify(letters));
  } catch (error) {
    console.log(error);
  }
};

export const getLetterById = async (letterId: string) => {
  try {
    await connectToDatabase();

    const letter = await Letter.findById(letterId);

    return JSON.parse(JSON.stringify(letter));
  } catch (error) {
    console.log(error);
  }
};
