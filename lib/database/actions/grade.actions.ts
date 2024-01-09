"use server";

import { handleError } from "@/lib/utils";
import Letter from "../models/letter.model";
import User from "../models/user.model";
import { connectToDatabase } from "..";
import Grade from "../models/grade.model";
import { revalidatePath } from "next/cache";
import {
  CreateGradeParams,
  DeleteGradeParams,
  GetAllGradesParams,
} from "@/types";

const getLetterByGrade = async (grade: string) => {
  return Letter.findOne({ grade: { $regex: grade, $options: "i" } });
};

const populateGrade = (query: any) => {
  return query
    .populate({
      path: "creator",
      model: User,
      select: "_id firstName lastName username",
    })
    .populate({ path: "letter", model: Letter, select: "_id grade" });
};

// Create
export async function createGrade({ userId, grade, path }: CreateGradeParams) {
  try {
    await connectToDatabase();

    const creator = await User.findById(userId);
    if (!creator) throw new Error("Creator not found");

    const newGrade = await Grade.create({
      ...grade,
      creator: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newGrade));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllGradesByUser({ creator }: GetAllGradesParams) {
  try {
    await connectToDatabase();

    const creatorCondition = creator ? { creator: creator } : null;
    const conditions = {
      $and: [creatorCondition ? { creator: creatorCondition.creator } : {}],
    };

    const gradesQuery = Grade.find(conditions).sort({ createdAt: "asc" });

    const grades = await populateGrade(gradesQuery);
    const gradesCount = await Grade.countDocuments(conditions);

    return { data: JSON.parse(JSON.stringify(grades)) };
  } catch (error) {
    handleError(error);
  }
}

export async function deleteGrade({ gradeId, path }: DeleteGradeParams) {
  try {
    await connectToDatabase();

    const deletedGrade = await Grade.findByIdAndDelete(gradeId);
    if (deletedGrade) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}
