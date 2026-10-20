"use client";

import { Plus, Pill } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import WrapperComponent from "../../WrapperComponent";
import PrescriptionCard from "@/shared/components/PatientRecords/PrescriptionCard";
import type { PrescriptionCardData } from "@/shared/components/PatientRecords/PrescriptionCard";
import EmptyPrescriptions from "./EmptyPrescriptions";

interface PrescriptionsProps {
  doctor?: boolean;
  prescriptions?: PrescriptionCardData[];
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onRevoke?: (id: string) => void;
}

export default function Prescriptions({
  doctor = false,
  prescriptions = [],
  onAdd,
  onEdit,
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
              onRevoke={onRevoke}
              onEdit={onEdit}
              isDoctor={doctor}
            />
          ))}
        </div>
      )}
    </WrapperComponent>
  );
}
