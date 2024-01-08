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

export const eventFormSchema = z.object({
  title: z.string().max(20, "Title must be less than 20 characters"),
  description: z.string().max(100, "Description has a max of 100 characters"),
  dateTime: z.date(),
});

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  description: z
    .string()
    .max(150, "Description must be less than 150 characters"),
  deadline: z.date(),
  priorityId: z.string(),
});
