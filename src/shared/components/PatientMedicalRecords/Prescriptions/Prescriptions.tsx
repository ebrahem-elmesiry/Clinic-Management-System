"use client";

import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import WrapperComponent from "../../WrapperComponent";
import PrescriptionCard from "@/shared/components/PatientRecords/PrescriptionCard";
import EmptyPrescriptions from "./EmptyPrescriptions";
import { Prescription } from "@/shared/types/patientRecords";

interface PrescriptionsProps {
  doctor?: boolean;
  prescriptions?: Prescription[];
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onRevoke?: (p: string) => void;
}

export default function Prescriptions({
  doctor = false,
  prescriptions = [],
  onAdd,
  onRevoke,
  onEdit,
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
              isDoctor={doctor}
              key={p.id}
              prescription={p}
              onRevoke={onRevoke}
            />
          ))}
        </div>
      )}
    </WrapperComponent>
  );
}
