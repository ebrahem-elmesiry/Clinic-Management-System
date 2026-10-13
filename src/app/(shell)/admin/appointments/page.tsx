"use client";

import { Suspense } from "react";
import AppointmentsPage from "@/shared/components/Appointments/AppointmentsPage";

export default function AdminAppointmentsRoute() {
  return (
    <Suspense fallback={null}>
      <AppointmentsPage />
    </Suspense>
  );
}
