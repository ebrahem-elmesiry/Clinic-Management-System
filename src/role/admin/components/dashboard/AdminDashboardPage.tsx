"use client";

import { Users, Calendar, DollarSign, UserCheck } from "lucide-react";
import StatisticsCard from "@/shared/components/StatisticsCard";
import QuickActions from "@/role/admin/components/dashboard/QuickActions";
import RevenueChart from "@/role/admin/components/dashboard/RevenueChart";
import AppointmentsChart from "@/role/admin/components/dashboard/AppointmentsChart";
import RecentBookings from "@/role/admin/components/dashboard/RecentBookings";
import Departments from "@/role/admin/components/dashboard/Departments";
import PageTitle from "@/shared/components/PageTitle";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Patients",
      value: "1,284",
      change: "+12% from last month",
      icon: Users,
      color: "blue" as const,
    },
    {
      title: "Appointments Today",
      value: "48",
      change: "8 pending confirmation",
      icon: Calendar,
      color: "teal" as const,
    },
    {
      title: "Revenue (Monthly)",
      value: "$28,450",
      change: "+18% from last month",
      icon: DollarSign,
      color: "green" as const,
    },
    {
      title: "Active Doctors",
      value: "24",
      change: "2 on leave",
      icon: UserCheck,
      color: "purple" as const,
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 18500 },
    { month: "Feb", revenue: 22000 },
    { month: "Mar", revenue: 19800 },
    { month: "Apr", revenue: 25600 },
    { month: "May", revenue: 24200 },
    { month: "Jun", revenue: 28450 },
  ];

  const appointmentData = [
    { day: "Mon", appointments: 42 },
    { day: "Tue", appointments: 38 },
    { day: "Wed", appointments: 45 },
    { day: "Thu", appointments: 52 },
    { day: "Fri", appointments: 48 },
    { day: "Sat", appointments: 28 },
    { day: "Sun", appointments: 15 },
  ];

  const departmentData = [
    { name: "General", value: 35, color: "#3B82F6" },
    { name: "Cardiology", value: 25, color: "#14B8A6" },
    { name: "Pediatrics", value: 20, color: "#F59E0B" },
    { name: "Orthopedics", value: 15, color: "#8B5CF6" },
    { name: "Other", value: 5, color: "#6B7280" },
  ];

  const recentBookings = [
    {
      id: 1,
      patient: "John Smith",
      doctor: "Dr. Sarah Johnson",
      time: "10:00 AM",
      status: "confirmed" as const,
    },
    {
      id: 2,
      patient: "Emma Wilson",
      doctor: "Dr. Michael Chen",
      time: "11:30 AM",
      status: "pending" as const,
    },
    {
      id: 3,
      patient: "James Brown",
      doctor: "Dr. Sarah Johnson",
      time: "02:00 PM",
      status: "confirmed" as const,
    },
    {
      id: 4,
      patient: "Lisa Anderson",
      doctor: "Dr. Robert Lee",
      time: "03:30 PM",
      status: "pending" as const,
    },
  ];

  const quickActions = [
    { label: "Add New Patient", icon: Users, color: "blue" as const },
    { label: "View All Doctors", icon: UserCheck, color: "green" as const },
    { label: "Edit Clinic", icon: UserCheck, color: "teal" as const },
  ];

  return (
    <div className="p-8 space-y-8">
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
