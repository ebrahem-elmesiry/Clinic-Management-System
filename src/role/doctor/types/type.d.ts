export interface TodayAppointment {
  id: number;
  patient: string;
  age: number;
  gender: "Male" | "Female";
  phone: string;
  specialty: string;
  reason: string;
  startTime: string;
  endTime: string;
  status: "completed" | "in-progress" | "upcoming" | "cancelled";
}

export type VisitStatusValue = "pending" | "completed" | "cancelled";

export interface Medicine {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  instructions: string;
}

export interface FollowUpAppointment {
  patientName: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  notes: string;
}
