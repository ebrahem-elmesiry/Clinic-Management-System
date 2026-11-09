"use client";

import { Prescription } from "@/shared/types/patientRecords";
import { Pill } from "lucide-react";
import { Button } from "../ui/button";

interface PrescriptionCardProps {
  prescription: Prescription;
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
  return (
    <div className="border border-gray-200 dark:border-purple-800/50 rounded-lg p-4 bg-linear-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-gray-900 dark:text-slate-100 mb-1">
            {prescription.medicine}
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            by {prescription.prescribedBy}
          </p>
        </div>
        <Pill className="w-5 h-5 text-blue-600" />
      </div>
      <div className="space-y-2 text-sm mb-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-slate-300">Dosage:</span>
          <span className="text-gray-900 dark:text-slate-100">
            {prescription.dosage}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-slate-300">Frequency:</span>
          <span className="text-gray-900 dark:text-slate-100">
            {prescription.frequency}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-slate-300">Timing:</span>
          <span className="text-gray-900 dark:text-slate-100">
            {prescription.timing}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-slate-300">Duration:</span>
          <span className="text-gray-900 dark:text-slate-100">
            {prescription.duration}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-blue-800/50">
        <span className="text-sm text-gray-600 dark:text-slate-300">
          Days remaining:
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            prescription.remainingDays <= 3
              ? "bg-red-100 text-red-700"
              : prescription.remainingDays <= 7
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"
          }`}
        >
          {prescription.remainingDays} days
        </span>
      </div>
      {prescription.specialInstructions && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
          <p className="text-xs text-gray-600 dark:text-slate-300 mb-1">
            Instructions:
          </p>
          <p className="text-xs text-gray-900 dark:text-slate-100">
            {prescription.specialInstructions}
          </p>
        </div>
      )}
      <div className="flex gap-2 mt-3">
        {isDoctor && (
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={() => onRevoke?.(prescription.id)}
            disabled={prescription.status.toLowerCase() === "revoked"}
          >
            Revoke
          </Button>
        )}
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
