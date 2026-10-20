import z from "zod";

export const emailField = z
  .email("Please enter a valid email address.")
  .min(1, "Email is required.");

export const passwordField = z
  .string()
  .min(6, "Password must be at least 6 characters.");

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: emailField,
  password: passwordField,
});
