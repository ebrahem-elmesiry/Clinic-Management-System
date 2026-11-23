export type VisitStatusValue =
  | "pending"
  | "completed"
  | "cancelled"
  | "in-progress";

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
  status: VisitStatusValue;
}

export interface DoctorStatusDashboardItem {
  title: string;
  value: string;
  changeValue: string;
  changeLabel: string;
  icon: LucideIcon;
  color: string;
}

export interface Medicine {
  id: string;
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
