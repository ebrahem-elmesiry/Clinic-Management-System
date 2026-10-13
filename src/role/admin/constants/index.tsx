// Start Dashboard

import {
  Booking,
  QuickAction,
  StatisticsAdminDashboardType,
  StatisticsCardType,
} from "../types/type";
import { Users, Calendar, DollarSign, UserCheck } from "lucide-react";

export const colorClasses = {
  "Total Patients":
    "from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700",
  "Today's Appointments":
    "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
  "Active Doctors":
    "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700",
  "Revenue (Monthly)":
    "from-green-500 to-green-600 dark:from-green-600 dark:to-green-700",
  Doctors: "from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-900",
  Patients: "from-teal-500 to-teal-600 dark:from-teal-700 dark:to-teal-900",
  Admins:
    "from-purple-500 to-purple-600 dark:from-purple-700 dark:to-purple-900",
  Inactive: "from-red-500 to-red-600 dark:from-red-700 dark:to-red-900",
  "Pending Reviews":
    "from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700",
  "Completed Today":
    "from-green-500 to-green-600 dark:from-green-600 dark:to-green-700",
};

export const stats: StatisticsAdminDashboardType[] = [
  {
    title: "Total Patients",
    value: "1,284",
    changeValue: "+12%",
    changeLabel: "from last month",
    icon: Users,
  },
  {
    title: "Today's Appointments",
    value: "48",
    changeValue: "8",
    changeLabel: "pending confirmation",
    icon: Calendar,
  },
  {
    title: "Revenue (Monthly)",
    value: "$28,450",
    changeValue: "+18%",
    changeLabel: "from last month",
    icon: DollarSign,
  },
  {
    title: "Active Doctors",
    value: "24",
    changeValue: "2",
    changeLabel: "on leave",
    icon: UserCheck,
  },
];

export const revenueData = [
  { month: "Jan", revenue: 18500 },
  { month: "Feb", revenue: 22000 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 25600 },
  { month: "May", revenue: 24200 },
  { month: "Jun", revenue: 28450 },
];

export const appointmentData = [
  { day: "Mon", appointments: 42 },
  { day: "Tue", appointments: 38 },
  { day: "Wed", appointments: 45 },
  { day: "Thu", appointments: 52 },
  { day: "Fri", appointments: 48 },
  { day: "Sat", appointments: 28 },
  { day: "Sun", appointments: 15 },
];

export const departmentData = [
  { name: "General", value: 35 },
  { name: "Cardiology", value: 25 },
  { name: "Pediatrics", value: 20 },
  { name: "Orthopedics", value: 15 },
  { name: "Other", value: 5 },
];

export const recentBookings: Booking[] = [
  {
    id: 1,
    patient: "John Smith",
    doctor: "Dr. Sarah Johnson",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    patient: "Emma Wilson",
    doctor: "Dr. Michael Chen",
    time: "11:30 AM",
    status: "pending",
  },
  {
    id: 3,
    patient: "James Brown",
    doctor: "Dr. Sarah Johnson",
    time: "02:00 PM",
    status: "confirmed",
  },
  {
    id: 4,
    patient: "Lisa Anderson",
    doctor: "Dr. Robert Lee",
    time: "03:30 PM",
    status: "pending",
  },
];

export const actionColorClass = {
  "Add New Patient": "from-blue-500 to-blue-600",
  "View All Doctors": "from-green-500 to-green-600",
  "Edit Clinic": "from-teal-500 to-teal-600",
};

export const quickActions: QuickAction[] = [
  { label: "Add New Patient", icon: Users, href: "/admin/patients?modal=add" },
  {
    label: "View All Doctors",
    icon: UserCheck,
    href: "/admin/user-management?search=doctors",
  },
  { label: "Edit Clinic", icon: UserCheck, href: "/admin/settings?tab=clinic" },
];

// End Dashboard

// Start User Management
import { UserX, Shield } from "lucide-react";

export const users = [
  {
    id: "1",
    name: "Doc Sarah Johnson",
    email: "sarah.johnson@clinic.com",
    role: "doctor",
    specialty: "General Physician",
    joinDate: "Jan 15, 2023",
    patients: 248,
  },
  {
    id: "2",
    name: "Doc Michael Chen",
    email: "michael.chen@clinic.com",
    role: "doctor",
    specialty: "Cardiologist",
    joinDate: "Mar 20, 2023",
    patients: 185,
  },
  {
    id: "3",
    name: "Doc Robert Lee",
    email: "robert.lee@clinic.com",
    role: "doctor",
    specialty: "Pediatrician",
    joinDate: "May 10, 2023",
    patients: 312,
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@clinic.com",
    role: "admin",
    joinDate: "Jan 1, 2023",
    patients: 0,
  },
  {
    id: "5",
    name: "Jane Smith",
    role: "patient",
    phone: "01225232123",
    joinDate: "Jun 5, 2024",
    patients: 0,
  },
  {
    id: "6",
    name: "Doc Emily White",
    email: "emily.white@clinic.com",
    role: "doctor",
    specialty: "Dermatologist",
    joinDate: "Feb 12, 2023",
    patients: 142,
  },
];

export const roleStats: StatisticsCardType[] = [
  { title: "Doctors", value: "24", icon: UserCheck },
  { title: "Admins", value: "3", icon: Shield },
  { title: "Patients", value: "1284", icon: UserCheck },
  { title: "Inactive", value: "5", icon: UserX },
];

// End User Management
