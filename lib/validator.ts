import * as z from "zod";

export const noteFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  content: z.string(),
  categoryId: z.string(),
});
