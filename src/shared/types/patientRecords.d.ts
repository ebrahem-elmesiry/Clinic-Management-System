import type {
  MedicationTiming,
  PrescriptionFormData,
} from "@/role/doctor/validations/validation";
import { Gender } from "./Roletype";

export type { MedicationTiming };

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  dob: string;
  phone: string;
  address: string;
  bloodGroup: string;
  lastVisit: string;
}

export type AddPatientForm = Omit<z.infer<typeof patientSchema>, "gender"> & {
  gender: Gender | null;
};

export type Tab = "visit-history" | "prescriptions" | "vitals";

export interface VisitPrescription {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  specialInstructions?: string;
}

export interface VisitRecord {
  patientId: string;
  date: string;
  doctor: string;
  reason: string;
  diagnosis: string;
  prescription: VisitPrescription[];
  followUp: string;
}

export interface Vital {
  patientId: string;
  label: string;
  value: string;
  unit: string;
  status: string;
}

export type PrescriptionStatus = "active" | "inactive";

export interface Prescription extends Omit<PrescriptionFormData, "timing"> {
  id: string;
  patientId: string;
  remainingDays: number;
  prescribedBy: string;
  status: PrescriptionStatus;
  date: string;
  timing: MedicationTiming | null;
}
