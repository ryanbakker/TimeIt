import * as z from "zod";

export const noteFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  content: z.string(),
  categoryId: z.string(),
});

export const gradeFormSchema = z.object({
  assignment: z
    .string()
    .min(3, "Assignment must be at least 3 characters")
    .max(30, "Assignment must be less than 30 characters"),
  credits: z.coerce.number(),
  letter: z.string(),
});
