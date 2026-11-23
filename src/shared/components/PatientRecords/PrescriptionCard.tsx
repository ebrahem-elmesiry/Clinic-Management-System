"use client";

import { Prescription } from "@/shared/types/patientRecords";
import { Pill } from "lucide-react";
import { Button } from "../ui/button";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";
import { cn } from "@/lib/utils";
import { MEDICATION_TIMING_LABELS } from "@/role/doctor/validations/validation";

interface PrescriptionCardProps {
  prescription: Prescription;
  onDelete?: (id: string) => void;
  startEdit?: (id: string) => void;
  isDoctor: boolean;
}

export default function PrescriptionCard({
  prescription,
  onDelete,
  startEdit,
  isDoctor,
}: PrescriptionCardProps) {
  const isActive = prescription.status === "active";

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-colors",
        isActive
          ? "border-blue-100 bg-linear-to-br from-blue-50 to-teal-50 dark:border-slate-700 dark:from-slate-800/70 dark:to-slate-800/40"
          : "border-gray-200 bg-linear-to-br from-gray-50 to-slate-100 dark:border-slate-700/70 dark:from-slate-800/50 dark:to-slate-800/30",
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className="text-gray-900 dark:text-slate-100">
              {prescription.medicine}
            </p>
            <StatusBadge status={prescription.status} />
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            by {prescription.prescribedBy}
          </p>
        </div>
        <Pill
          className={cn(
            "w-5 h-5 shrink-0",
            isActive
              ? "text-teal-600 dark:text-teal-400"
              : "text-gray-400 dark:text-slate-500",
          )}
        />
      </div>

      <div className="space-y-2 text-sm mb-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-slate-300">Dosage:</span>
          <span className="text-gray-900 dark:text-slate-100">
            {prescription.dosage} tablet
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
            {prescription.timing
              ? MEDICATION_TIMING_LABELS[prescription.timing]
              : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-slate-300">Duration:</span>
          <span className="text-gray-900 dark:text-slate-100">
            {prescription.duration}{" "}
            {Number(prescription.duration) > 1 ? "days" : "day"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center justify-between p-3 rounded-lg border",
          isActive
            ? "border-teal-200 bg-white dark:border-teal-900/50 dark:bg-slate-800"
            : "border-gray-200 bg-white/70 dark:border-slate-700 dark:bg-slate-800/60",
        )}
      >
        <span className="text-sm text-gray-600 dark:text-slate-300">
          Days remaining:
        </span>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs",
            !isActive
              ? "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300"
              : prescription.remainingDays <= 3
                ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                : prescription.remainingDays <= 7
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                  : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
          )}
        >
          {prescription.remainingDays} days
        </span>
      </div>

      {prescription.specialInstructions && (
        <div
          className={cn(
            "mt-3 p-3 rounded-lg border",
            isActive
              ? "border-teal-100 bg-teal-50/60 dark:border-teal-900/40 dark:bg-teal-900/10"
              : "border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-slate-800/40",
          )}
        >
          <p className="text-xs text-gray-600 dark:text-slate-300 mb-1">
            Instructions:
          </p>
          <p className="text-xs text-gray-900 dark:text-slate-100">
            {prescription.specialInstructions}
          </p>
        </div>
      )}

      {isActive && isDoctor && (onDelete || startEdit) && (
        <div className="flex gap-2 mt-3">
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => onDelete(prescription.id)}
            >
              Delete
            </Button>
          )}
          {startEdit && (
            <Button
              variant="outline"
              size="sm"
              className="text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/20"
              onClick={() => startEdit(prescription.id)}
            >
              Edit
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
