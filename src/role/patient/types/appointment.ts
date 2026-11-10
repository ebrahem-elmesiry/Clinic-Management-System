import { FollowUpAppointment } from "@/role/doctor/types/type";
import { Appointment, ClinicType } from "@/shared/types/appointment";
import { Dispatch, SetStateAction } from "react";

export interface UseAddNewAppointmentProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  patientName?: string;
  specialty_id?: string;
  appointmentType?: string;
  showTrigger?: boolean;
  onSchedule?: (data: FollowUpAppointment) => void;
  clinicInfo: ClinicType;
  setAppointmentsDB: Dispatch<SetStateAction<Appointment[]>>;
}

export interface ScheduleData {
  date: string;
  time: string | null;
  specialty_id: string;
}

export interface AppointmentDetails {
  patientName: string;
  type: string;
  notes: string;
}
