import { FollowUpAppointment } from "@/role/doctor/types/type";

export interface UseAddNewAppointmentProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  patientName?: string;
  specialty_id?: string;
  appointmentType?: string;
  showTrigger?: boolean;
  onSchedule?: (data: FollowUpAppointment) => void;
}

export interface ScheduleData {
  date: string;
  time: string | null;
  specialty: string;
}

export interface AppointmentDetails {
  patientName: string;
  type: string;
  notes: string;
}
