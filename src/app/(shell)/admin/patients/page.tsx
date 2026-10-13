"use client";

import { Suspense } from "react";
import PatientRecordsPage from "@/role/admin/components/PatientRecords/PatientRecordsPage";

export default function AdminPatientsRoute() {
  return (
    <Suspense fallback={null}>
      <PatientRecordsPage />
    </Suspense>
  );
}
