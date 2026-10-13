import { Moon, Sun, Monitor } from "lucide-react";
import { SettingsTabItem } from "../components/settings/TabTitle";
import { User, Bell, Shield, Building2, Hospital, Stethoscope } from "lucide-react";

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
