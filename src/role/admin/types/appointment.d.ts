export type AppointmentStatus =
  | "confirmed"
  | "pending"
  | "completed"
  | "cancelled";

export interface Appointment {
  id: string;
  patient: {
    id: string;
    name: string;
    gender: "Male" | "Female";
    age: number;
  };
  doctor_id: string;
  clinic_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  reason: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty_id: string;
  specialty_name: string;
}

export interface Specialty {
  id: string;
  name: string;
  doctor_id: string;
  price: number;
}

export interface AppointmentWithDoctor {
  doctor: Doctor;
  appointments: Appointment[];
}
