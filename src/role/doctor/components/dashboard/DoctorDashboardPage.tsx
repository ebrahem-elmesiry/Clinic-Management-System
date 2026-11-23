import StatisticsCard from "@/shared/components/StatisticsCard";
import TodayAppointments from "@/role/doctor/components/dashboard/TodayAppointments";
import { DoctorStatusDashboardItem, TodayAppointment } from "../../types/type";

interface Props {
  doctorStatusDashboard: DoctorStatusDashboardItem[];
  todaysAppointments: TodayAppointment[];
}

export default function DoctorDashboard({
  doctorStatusDashboard,
  todaysAppointments,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-slate-100 mb-2">
          Good Morning, Dr. Sarah Johnson
        </h1>
        <p className="text-gray-600 dark:text-slate-300">
          Here's what's happening with your patients today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorStatusDashboard.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>

      <TodayAppointments appointments={todaysAppointments} />
    </div>
  );
}
