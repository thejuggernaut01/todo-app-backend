import z from "zod";

export const addTaskSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Task title must be at least 2 characters long" }),
  description: z
    .string()
    .min(2, { message: "Task description must be at least 2 characters long" }),
});
