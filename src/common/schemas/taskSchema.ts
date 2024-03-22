import z from "zod";

export const addTaskSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" }),
  // description: z
  //   .string()
  //   .min(2, { message: "Title must be at least 2 characters long" }),
});
