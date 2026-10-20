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
