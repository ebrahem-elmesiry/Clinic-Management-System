import { Calendar, Users, Clock, CheckCircle } from "lucide-react";
import type { TodayAppointment } from "../types/type";

export const stats = [
  {
    title: "Today's Appointments" as const,
    value: "12",
    changeValue: "+3",
    changeLabel: "from yesterday",
    icon: Calendar,
  },
  {
    title: "Total Patients" as const,
    value: "248",
    changeValue: "+12",
    changeLabel: "this week",
    icon: Users,
  },
  {
    title: "Pending Reviews" as const,
    value: "8",
    changeValue: "3",
    changeLabel: "urgent",
    icon: Clock,
  },
  {
    title: "Completed Today" as const,
    value: "7",
    changeValue: "58%",
    changeLabel: "completion rate",
    icon: CheckCircle,
  },
];
