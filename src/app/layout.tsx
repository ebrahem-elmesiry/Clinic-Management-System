import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/providers/AuthProvider";
import "./globals.css";
import Providers from "./providers/Providers";
import { Gender, UserRole } from "@/shared/types/type";
import { AppointmentProvider } from "@/shared/context/AppointmentContext";

export const metadata: Metadata = {
  title: "HealthCare Clinic Management System",
  description:
    "A comprehensive clinic management system for appointments, patient records, prescriptions, and billing.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const profile = {
    id: "123",
    name: "Ebrahem Ahmed",
    role: "admin" as UserRole,
    gender: "Male" as Gender,
    age: 20,
    bloodGroup: "O+",
  };
  const clinicInfoS = {
    id: "clinic_id",
    name: "HealthCare Clinic",
    owner_id: "owner_id",
    working_days: [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
    ],
    openingTime: "09:00",
    closingTime: "17:00",
    description: "description",
    phone: "01239482371",
    duration: "30",
    bufferTime: "10",
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AuthProvider profile={profile}>
          <AppointmentProvider clinicInfoS={clinicInfoS}>
            <Providers>{children}</Providers>
          </AppointmentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
