// Dashboard
import {
  actionColorClass,
  colorClasses,
  roleStats,
  userManagementClasses,
} from "../constants";

export interface StatisticsCardType {
  title: string;
  value: string;
  icon: LucideIcon;
}

export interface changeStatisticType {
  changeValue?: string;
  changeLabel?: string;
}

export interface StatisticsAdminDashboardType extends StatisticsCardType {
  changeValue?: string;
  changeLabel?: string;
  color: string;
}

export interface QuickAction {
  label: actionColor;
  icon: LucideIcon;
  href: string;
}

export type actionColor = keyof typeof actionColorClass;

export type statusType = "confirmed" | "pending";

export interface Booking {
  id: number;
  patient: string;
  doctor: string;
  time: string;
  status: statusType;
}

// Appointments Page
export type ViewType = "calendar" | "list";
