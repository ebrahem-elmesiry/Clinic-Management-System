import PatientRecordsPage from "@/shared/components/PatientRecords/PatientRecordsPage";
import { Suspense } from "react";

export default function DoctorPatientRecordsRoute() {
  return (
    <Suspense>
      <PatientRecordsPage />
    </Suspense>
  );
}
