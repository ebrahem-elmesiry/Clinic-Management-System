import { ClinicInfoType } from "@/role/admin/validations/settings/validation";

export type AppointmentStatus =
  | "confirmed"
  | "pending"
  | "completed"
  | "cancelled";

export interface Specialty {
  id: string;
  name: string;
  doctor_id: string;
  price: number;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty_id: string;
  specialty_name: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
}

export interface Appointment {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  reason: string;
  patient: Patient;
  doctor: Doctor;
  clinic_id: string;
}

export interface AppointmentMonth {
  start: string;
  end: string;
  appointments: Appointment[];
}

export interface ClinicType extends ClinicInfoType {
  id: string;
  owner_id: string;
}
