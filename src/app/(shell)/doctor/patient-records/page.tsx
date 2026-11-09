"use client";

import { Suspense } from "react";
import PatientRecordsPage from "@/shared/components/PatientRecords/PatientRecordsPage";

export default function DoctorPatientRecordsRoute() {
  return (
    <Suspense fallback={null}>
      <PatientRecordsPage />
    </Suspense>
  );
}
