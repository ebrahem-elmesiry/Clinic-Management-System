import {
  adminProfile,
  doctorProfile,
  patientProfile,
  Profile,
} from "@/shared/types/type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isDoctorProfile(user: Profile): user is doctorProfile {
  return user.role === "doctor";
}
export function isAdminProfile(user: Profile): user is adminProfile {
  return user.role === "admin";
}
export function isPatientProfile(user: Profile): user is patientProfile {
  return user.role === "patient";
}
