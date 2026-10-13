import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/providers/AuthProvider";
import "./globals.css";
import Providers from "./providers/Providers";

export const metadata: Metadata = {
  title: "HealthCare Clinic Management System",
  description:
    "A comprehensive clinic management system for appointments, patient records, prescriptions, and billing.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
