import * as z from "zod";
import { passwordSchema } from "@/shared/validations/password-validations";

const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

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

export const vitalsSchema = z.object({
  bloodPressure: z
    .string()
    .trim()
    .min(1, "Blood pressure is required")
    .regex(/^\d{2,3}\/\d{2,3}$/, "Blood pressure must be like 120/80"),
  heartRate: z
    .string()
    .trim()
    .min(1, "Heart rate is required")
    .regex(/^\d+$/, "Heart rate must be a number")
    .refine((v) => {
      const n = Number(v);
      return n >= 30 && n <= 220;
    }, "Heart rate must be between 30 and 220 bpm"),
  temperature: z
    .string()
    .trim()
    .min(1, "Temperature is required")
    .regex(/^\d+(\.\d+)?$/, "Temperature must be a number")
    .refine((v) => {
      const n = Number(v);
      return n >= 90 && n <= 110;
    }, "Temperature must be between 90 and 110 °F"),
  bloodSugar: z
    .string()
    .trim()
    .min(1, "Blood sugar is required")
    .regex(/^\d+$/, "Blood sugar must be a number")
    .refine((v) => {
      const n = Number(v);
      return n >= 20 && n <= 600;
    }, "Blood sugar must be between 20 and 600 mg/dL"),
  weight: z
    .string()
    .trim()
    .min(1, "Weight is required")
    .regex(/^\d+(\.\d+)?$/, "Weight must be a number")
    .refine((v) => {
      const n = Number(v);
      return n >= 10 && n <= 700;
    }, "Weight must be between 10 and 700 lbs"),
  height: z
    .string()
    .trim()
    .min(1, "Height is required")
    .min(2, "Height is required"),
  notes: z.string().trim().optional(),
});

export type VitalsFormDataValidated = z.infer<typeof vitalsSchema>;

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

const profileBase = z.object({
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
});

export const adminProfileSchema = profileBase.extend({
  email: z
    .email("Email must be a valid address")
    .trim()
    .min(1, "Email is required"),
});

export type AdminProfileFormData = z.infer<typeof adminProfileSchema>;

export const doctorProfileSchema = profileBase.extend({
  specialty: z.string().trim().min(1, "Specialty is required"),
  email: z
    .email("Email must be a valid address")
    .trim()
    .min(1, "Email is required"),
});

export type DoctorProfileFormData = z.infer<typeof doctorProfileSchema>;

export const patientProfileSchema = profileBase.extend({
  blood: z
    .string()
    .trim()
    .min(1, "Blood group is required")
    .refine(
      (val) => ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(val),
      "Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-",
    ),
  date: z.string().trim().min(1, "Date of birth is required"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .min(3, "Address must be at least 3 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(/^[+()\-\s\d]{6,}$/, "Phone number is not valid"),
});

export type PatientProfileFormData = z.infer<typeof patientProfileSchema>;
