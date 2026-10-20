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
  // email?: string;
  address: string;
  bloodGroup: string;
  // emergencyContact?: string;
  // allergies?: string;
}

export interface VisitPrescription {
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
  medicineName: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  specialInstructions?: string;
  status: string;
  prescribedBy: string;
  date: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
}
