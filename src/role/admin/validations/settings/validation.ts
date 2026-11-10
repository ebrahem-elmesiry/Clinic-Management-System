import * as z from "zod";
import { passwordSchema } from "@/shared/validations/password-validations";

export const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

export const patientSchema = z.object({
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
  bloodGroup: z
    .string()
    .trim()
    .min(1, "Blood group is required")
    .refine(
      (val) => ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(val),
      "Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-",
    ),
  birthDay: z.string().trim().min(1, "Birth date is required"),
  gender: z.string().trim().min(1, "Gender is required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(
      /^(010|011|012|015)\d{8}$/,
      "Phone must be 11 digits starting with 010, 011, 012 or 015",
    ),
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .min(3, "Address must be at least 3 characters"),
});

export type FormData = z.infer<typeof patientSchema>;

export const adminUserSchemaEdit = z.object({
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
  email: z
    .email("Email must be a valid address")
    .trim()
    .min(1, "Email is required"),
});

export const adminUserSchema = adminUserSchemaEdit.extend({
  password: passwordSchema,
});

export type AdminUserFormData = z.infer<typeof adminUserSchema>;

export const clinicInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Clinic name must be at least 3 characters")
    .regex(
      /^[a-zA-Z\u0600-\u06FF\s]+$/,
      "Clinic name must contain letters only",
    ),
  working_days: z
    .array(z.number())
    .min(1, "At least one working day is required"),
  openingTime: z.string().trim().min(1, "Opening time is required"),
  closingTime: z.string().trim().min(1, "Closing time is required"),
  description: z.string().trim().min(1, "Description is required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(
      /^(010|011|012|015)\d{8}$/,
      "Phone must be 11 digits starting with 010, 011, 012 or 015",
    ),
  duration: z.string().trim().min(1, "Appointment duration is required"),
  bufferTime: z.string().trim().min(1, "Buffer time is required"),
});

export type ClinicInfoType = z.infer<typeof clinicInfoSchema>;
