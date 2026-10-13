import dynamic from "next/dynamic";
import StatisticsCard from "@/shared/components/StatisticsCard";
import QuickActions from "@/role/admin/components/dashboard/QuickActions";
import PageTitle from "@/shared/components/PageTitle";
import {
  appointmentData,
  departmentData,
  quickActions,
  recentBookings,
  revenueData,
  stats,
} from "../../constants";
import RecentBookings from "./RecentBookings";

const Departments = dynamic(
  () => import("@/role/admin/components/dashboard/Departments"),
);

const RevenueChart = dynamic(
  () => import("@/role/admin/components/dashboard/RevenueChart"),
);
const AppointmentsChart = dynamic(
  () => import("@/role/admin/components/dashboard/AppointmentsChart"),
);

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <PageTitle
        title="Admin Dashboard"
        description="Overview of clinic operations and statistics"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>

      <QuickActions actions={quickActions} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <AppointmentsChart data={appointmentData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentBookings bookings={recentBookings} />
        <Departments data={departmentData} />
      </div>
    </div>
  );
}
