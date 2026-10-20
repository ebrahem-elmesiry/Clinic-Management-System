"use client";

import { useState } from "react";
import VisitHistory from "@/shared/components/PatientMedicalRecords/VisitHistory/VisitHistory";
import ViewDetailsModal from "@/shared/modals/ViewDetailsModal";
import { visits } from "@/shared/constants/patientRecords";
import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { TabsSkeleton } from "../skeletons";
import { PatientProfile } from "@/shared/types/patientRecords";

interface VisitHistoryTabProps {
  patient?: PatientProfile;
  isUnknown?: boolean;
  patientId?: string | null;
}

export default function VisitHistoryTab({
  patient,
  isUnknown,
  patientId,
}: VisitHistoryTabProps) {
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
          visits={patientVisits}
          onViewDetails={(v) => setSelectedVisit(v as (typeof visits)[number])}
        />
      )}
      <ViewDetailsModal
        open={!!selectedVisit}
        onOpenChange={(open) => !open && setSelectedVisit(null)}
        visit={selectedVisit}
      />
    </>
  );
}
