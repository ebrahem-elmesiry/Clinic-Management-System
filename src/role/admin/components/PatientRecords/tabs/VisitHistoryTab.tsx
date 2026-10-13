"use client";

import { useState } from "react";
import VisitHistory from "@/shared/components/PatientMedicalRecords/VisitHistory/VisitHistory";
import ViewDetailsModal from "../../../modals/ViewDetailsModal";
import { visits } from "../../../constants/patientRecords";
import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { TabsSkeleton } from "../skeletons";

interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
}

interface VisitHistoryTabProps {
  patient?: PatientProfile;
  isUnknown?: boolean;
  patientId?: string | null;
}

export default function VisitHistoryTab({ patient, isUnknown, patientId }: VisitHistoryTabProps) {
  const [selectedVisit, setSelectedVisit] = useState<
    (typeof visits)[number] | null
  >(null);

  if (isUnknown) {
    return <UnknownPatient patientId={patientId} />;
  }

  if (!patient) {
    return <NoPatientChoose />;
  }

  const isPending = false;

  const patientVisits = visits.filter((v) => v.patientId === patient.id);

  return (
    <>
      {isPending ? (
        <TabsSkeleton variant="visit-history" />
      ) : (
        <VisitHistory
          visits={patientVisits as any}
          onViewDetails={(v) => setSelectedVisit(v as (typeof visits)[number])}
        />
      )}
      <ViewDetailsModal
        open={!!selectedVisit}
        onOpenChange={(open) => !open && setSelectedVisit(null)}
        visit={selectedVisit as any}
      />
    </>
  );
}
