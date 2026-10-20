"use client";

import { Button } from "@/shared/components/ui/button";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";

export interface PrescriptionCardData {
  id: string;
  patientId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  specialInstructions?: string;
  notes?: string;
  status: string; // Active | Revoked | etc
  prescribedBy: string;
  date: string;
}

interface PrescriptionCardProps {
  prescription: PrescriptionCardData;
  onRevoke?: (id: string) => void;
  onEdit?: (id: string) => void;
  isDoctor: boolean;
}

export default function PrescriptionCard({
  prescription,
  onRevoke,
  onEdit,
  isDoctor,
}: PrescriptionCardProps) {
  const dosageLine = `Dosage: ${prescription.dosage} · ${prescription.frequency} · ${prescription.timing} · ${prescription.duration}`;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {prescription.medicineName}
        </h4>
        <StatusBadge status={prescription.status} />
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">{dosageLine}</p>

      {prescription.specialInstructions && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {prescription.specialInstructions}
        </p>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Prescribed by {prescription.prescribedBy} on {prescription.date}
        {prescription.notes ? ` · ${prescription.notes}` : ""}
      </p>

      <div className="flex gap-2 mt-3">
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={() => onRevoke?.(prescription.id)}
          disabled={prescription.status.toLowerCase() === "revoked"}
        >
          Revoke
        </Button>
        {onEdit && isDoctor && (
          <Button
            variant="outline"
            size="sm"
            className="text-green-60 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20"
            onClick={() => onEdit(prescription.id)}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}
