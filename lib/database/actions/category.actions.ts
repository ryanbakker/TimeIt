"use server";

import { handleError } from "@/lib/utils";
import Category from "../models/category.model";
import {
  CreateCategoryParams,
  DeleteCategoryParams,
  GetAllCategoriesParams,
} from "@/types";
import { connectToDatabase } from "./../index";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

export const createCategory = async ({
  categoryName,
  userId,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const creator = await User.findById(userId);
    if (!creator) throw new Error("User not found");

    const newCategory = await Category.create({
      name: categoryName,
      creator: userId,
    });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async ({ userId }: GetAllCategoriesParams) => {
  try {
    await connectToDatabase();

    const creatorCondition = userId ? { creator: userId } : null;
    const conditions = {
      $and: [creatorCondition ? { creator: creatorCondition.creator } : {}],
    };

    const categories = await Category.find(conditions);

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};

export async function deleteSelectedCategory({
  categoryId,
}: DeleteCategoryParams) {
  try {
    await connectToDatabase();

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (deletedCategory) return;
  } catch (error) {
    handleError(error);
  }
}
