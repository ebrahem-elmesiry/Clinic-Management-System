"use client";

import { Plus, Pill } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import WrapperComponent from "../../WrapperComponent";
import PrescriptionCard from "@/role/admin/components/PatientRecords/PrescriptionCard";
import type { PrescriptionCardData } from "@/role/admin/components/PatientRecords/PrescriptionCard";
import EmptyPrescriptions from "./EmptyPrescriptions";

interface PrescriptionsProps {
  doctor?: boolean;
  prescriptions?: PrescriptionCardData[];
  onAdd?: () => void;
  onViewPDF?: (p: PrescriptionCardData) => void;
  onRevoke?: (p: PrescriptionCardData) => void;
}

export default function Prescriptions({
  doctor = false,
  prescriptions = [],
  onAdd,
  onViewPDF,
  onRevoke,
}: PrescriptionsProps) {
  return (
    <WrapperComponent
      showButton={doctor}
      Button={
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Prescription
        </Button>
      }
      title="Current Prescriptions"
    >
      {prescriptions.length === 0 ? (
        <EmptyPrescriptions />
      ) : (
        <div className="space-y-4">
          {prescriptions.map((p) => (
            <PrescriptionCard
              key={p.id}
              prescription={p}
              onViewPDF={onViewPDF}
              onRevoke={onRevoke}
            />
          ))}
        </div>
      )}
    </WrapperComponent>
  );
}
