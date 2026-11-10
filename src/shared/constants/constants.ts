import { Moon, Sun, Monitor } from "lucide-react";
import { SettingsTabItem } from "../components/settings/TabTitle";
import {
  User,
  Bell,
  Shield,
  Building2,
  Hospital,
  Stethoscope,
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Palette,
  Settings,
  UserCog,
  Users,
} from "lucide-react";
import { NavItem, UserRole } from "../types/Roletype";

export const themes = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

export const tabs: SettingsTabItem[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "preferences", label: "Preferences", icon: Building2 },
  { id: "clinic", label: "Clinic Information", icon: Hospital, admin: true },
  { id: "doctor-fees", label: "Doctor Fees", icon: Stethoscope, admin: true },
];

export const appointmentReasons = [
  { value: "checkup", label: "Regular Checkup" },
  { value: "followup", label: "Follow-up" },
  { value: "consultation", label: "Consultation" },
];

export const menuItems: Record<UserRole, NavItem[]> = {
  doctor: [
    { href: "/doctor/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/doctor/appointments", label: "Appointments", icon: Calendar },
    {
      href: "/doctor/patient-records?tab=visit-history",
      label: "Patient Records",
      icon: Users,
    },
    { href: "/doctor/visit-notes", label: "Visit Notes", icon: ClipboardList },
    { href: "/doctor/settings", label: "Profile", icon: Settings },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/appointments", label: "Appointments", icon: Calendar },
    {
      href: "/admin/patients?tab=visit-history",
      label: "Patients",
      icon: Users,
    },
    { href: "/admin/user-management", label: "User Management", icon: UserCog },
    { href: "/admin/settings", label: "Profile", icon: Settings },
    { href: "/admin/design-system", label: "Design System", icon: Palette },
  ],
  patient: [
    { href: "/patient/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/patient/appointments", label: "My Appointments", icon: Calendar },
    {
      href: "/patient/medical-records?tab=visit-history",
      label: "Medical Records",
      icon: FileText,
    },
    { href: "/patient/settings", label: "Settings", icon: Settings },
  ],
};
