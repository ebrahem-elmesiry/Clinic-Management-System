"use client";

import { useState } from "react";
import VisitHistory from "@/shared/components/PatientMedicalRecords/VisitHistory/VisitHistory";
import ViewDetailsModal from "@/shared/modals/ViewDetailsModal";
import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { TabsSkeleton } from "../skeletons";
import { VisitRecord } from "@/shared/types/patientRecords";

interface VisitHistoryTabProps {
  isUnknown?: boolean;
  patientId: string | undefined;
  visits: VisitRecord[];
  isPending: boolean;
}

export default function VisitHistoryTab({
  isUnknown,
  patientId,
  visits,
  isPending,
}: VisitHistoryTabProps) {
  const [selectedVisit, setSelectedVisit] = useState<
    (typeof visits)[number] | null
  >(null);

  if (isUnknown) return <UnknownPatient patientId={patientId} />;

  if (!patientId) return <NoPatientChoose />;

  return (
    <>
      {isPending ? (
        <TabsSkeleton variant="visit-history" />
      ) : (
        <VisitHistory
          visits={visits}
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
