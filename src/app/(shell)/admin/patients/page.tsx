import PatientRecordsPage from "@/shared/components/PatientRecords/PatientRecordsPage";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <PatientRecordsPage />
    </Suspense>
  );
}
