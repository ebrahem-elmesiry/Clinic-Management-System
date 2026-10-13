import { passwordSchema } from "@/shared/validations/password-validations";
import * as z from "zod";

const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

export const patientUserSchemaEdit = z.object({
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
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(
      /^(010|011|012|015)\d{8}$/,
      "Phone must be 11 digits starting with 010, 011, 012 or 015",
    ),
  password: passwordSchema,
});

export const patientUserSchema = patientUserSchemaEdit.extend({
  password: passwordSchema,
});

export type PatientUserFormData = z.infer<typeof patientUserSchema>;
