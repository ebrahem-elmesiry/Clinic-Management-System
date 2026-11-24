import { colorClasses } from "@/role/admin/constants";
import DoctorDashboard from "@/role/doctor/components/dashboard/DoctorDashboardPage";
import {
  DoctorStatusDashboardItem,
  TodayAppointment,
} from "@/role/doctor/types/type";
import { Calendar, UserCheck, Users } from "lucide-react";

const doctorStatusDashboard: DoctorStatusDashboardItem[] = [
  {
    title: "Total Patients",
    value: "1,284",
    changeValue: "+12%",
    changeLabel: "from last month",
    icon: Users,
    color: colorClasses.Patients,
  },
  {
    title: "Today's Appointments",
    value: "48",
    changeValue: "8",
    changeLabel: "pending confirmation",
    icon: Calendar,
    color: colorClasses.blue,
  },
  {
    title: "Pending Visits",
    value: "24",
    changeValue: "2",
    changeLabel: "on leave",
    icon: UserCheck,
    color: colorClasses.orange,
  },
];
const todaysAppointments: TodayAppointment[] = [
  {
    id: 1,
    patient: "John Smith",
    age: 45,
    gender: "Male",
    phone: "01012345678",
    specialty: "General Physician",
    reason: "Regular Checkup",
    startTime: "09:00 AM",
    endTime: "09:30 AM",
    status: "completed",
  },
  {
    id: 2,
    patient: "Emma Johnson",
    age: 32,
    gender: "Female",
    phone: "01123456789",
    specialty: "Cardiologist",
    reason: "Follow-up",
    startTime: "09:30 AM",
    endTime: "10:00 AM",
    status: "cancelled",
  },
  {
    id: 3,
    patient: "Michael Brown",
    age: 58,
    gender: "Male",
    phone: "01234567890",
    specialty: "Dermatologist",
    reason: "Regular Checkup",
    startTime: "10:00 AM",
    endTime: "10:30 AM",
    status: "pending",
  },
  {
    id: 4,
    patient: "Sarah Davis",
    age: 28,
    gender: "Female",
    phone: "01098765432",
    specialty: "General Physician",
    reason: "Follow-up",
    startTime: "10:30 AM",
    endTime: "11:00 AM",
    status: "in-progress",
  },
  {
    id: 5,
    patient: "James Wilson",
    age: 41,
    gender: "Male",
    phone: "01555667788",
    specialty: "Cardiologist",
    reason: "Regular Checkup",
    startTime: "11:00 AM",
    endTime: "11:30 AM",
    status: "cancelled",
  },
];

export default function DoctorDashboardRoute() {
  return (
    <DoctorDashboard
      todaysAppointments={todaysAppointments}
      doctorStatusDashboard={doctorStatusDashboard}
    />
  );
}
