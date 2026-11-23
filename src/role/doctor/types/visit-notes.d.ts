import { VisitStatusValue } from "./type";
export type AppointmentType = "regular" | "follow-up";

export interface VisitNotesState {
  status: VisitStatusValue;
  diagnosis: string;
  doctorNotes: string;
  followUp: boolean;
  nextAppointment: FollowUpAppointment | null;
}

export interface CancellationState {
  cancelReason: string;
  cancelNote: string;
}

export interface PatientData {
  patientId: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  reason: string;
  appointmentType: AppointmentType;
  doctor_id: string;
  specialty_id: string;
  appointment_id: string;
}
