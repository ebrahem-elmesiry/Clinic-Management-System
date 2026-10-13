import { passwordSchema } from "@/shared/validations/password-validations";
import * as z from "zod";

const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

export const doctorUserSchemaEdit = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .regex(
      nameRegex,
      "First name must not contain special characters or numbers",
    ),
  lastName: z
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters")
    .regex(
      nameRegex,
      "Last name must not contain special characters or numbers",
    ),
  specialty: z.string().trim().min(1, "Specialty is required"),
  email: z
    .email("Email must be a valid address")
    .trim()
    .min(1, "Email is required"),
});

export const doctorUserSchema = doctorUserSchemaEdit.extend({
  password: passwordSchema,
});

export type DoctorUserFormData = z.infer<typeof doctorUserSchema>;
