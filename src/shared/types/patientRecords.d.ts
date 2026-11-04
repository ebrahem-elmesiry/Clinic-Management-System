export interface PatientInformationType {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone?: string;
  lastVisit: string | undefined;
}

export type PatientListItem = PatientInformationType;

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  phone: string;
  address: string;
  bloodGroup: string;
}

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

export interface Prescription {
  id: string;
  patientId: string;
  medicine: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  specialInstructions?: string;
  remainingDays: number;
  prescribedBy: string;
  status: string;
  date: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
}
