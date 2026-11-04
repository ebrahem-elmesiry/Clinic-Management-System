import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/providers/AuthProvider";
import "./globals.css";
import Providers from "./providers/Providers";
import { Gender, UserRole } from "@/shared/types/type";

export const metadata: Metadata = {
  title: "HealthCare Clinic Management System",
  description:
    "A comprehensive clinic management system for appointments, patient records, prescriptions, and billing.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const profile = {
    id: "123",
    name: "Ebrahem Ahmed",
    role: "patient" as UserRole,
    gender: "Male" as Gender,
    age: 20,
    bloodGroup: "O+",
  };
  const clinicInfo = {
    id: "clinic_id",
    name: "clinic",
    owner_id: "owner_id",
    working_days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
    openingTime: "09:00",
    closingTime: "17:00",
    description: "description",
    phone: "01239482371",
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AuthProvider profile={profile} clinicInfo={clinicInfo}>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
