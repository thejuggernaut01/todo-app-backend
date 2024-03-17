import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .regex(/^[A-Z][a-z]+$/, {
      message: "First name must be in sentence case.",
    })
    .max(20, { message: "First Name must be less than 20 characters" }),
  lastName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .regex(/^[A-Z][a-z]+$/, {
      message: "Last name must be in sentence case",
    })
    .max(20, { message: "Last Name must be less than 20 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const verifyEmailSchema = z.object({
  token: z.string({ required_error: "token is required" }),
});

export const resendEmailSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email")
    .optional(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
});

export const updatePasswordSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
  token: z.string({ required_error: "token is required" }),
});
