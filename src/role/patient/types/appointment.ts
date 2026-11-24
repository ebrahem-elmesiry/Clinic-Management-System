import { FollowUpAppointment } from "@/role/doctor/types/type";
import { Appointment, ClinicType } from "@/shared/types/appointment";
import { Dispatch, SetStateAction } from "react";

export interface UseAddNewAppointmentProps {
  isFollowUp?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  prefill?: {
    patientName: string;
    specialtyId: string;
    appointmentType: string;
  };
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
