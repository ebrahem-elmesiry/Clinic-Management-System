"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { ClipboardList, Activity, Pill } from "lucide-react";

export interface VisitPrescription {
  medicineName: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  specialInstructions?: string;
}

export interface VisitDetails {
  date: string;
  time?: string;
  doctor: string;
  type?: string;
  reason: string;
  diagnosis: string;
  prescription: VisitPrescription[];
  followUp: string;
  reasonForVisit?: string;
  visitNotes?: string;
  billingCode?: string;
}

interface ViewDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visit: VisitDetails | null;
}

export default function ViewDetailsModal({
  open,
  onOpenChange,
  visit,
}: ViewDetailsModalProps) {
  if (!visit) return null;

  const handlePrint = () => window.print();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-900 dark:text-gray-100">
            Visit Details
          </DialogTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {visit.date} {visit.time ? `· ${visit.time}` : ""} · {visit.doctor}
          </p>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Top grid: Date / Time / Doctor / Type — matches 14c m-grid2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {visit.date}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {visit.time ?? "10:00 AM"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Doctor</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {visit.doctor}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {visit.type ?? visit.reason}
              </p>
            </div>
          </div>

          {/* Reason for Visit */}
          <div className="space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              <ClipboardList className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              Reason for Visit
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {visit.reasonForVisit ?? visit.reason}
            </p>
          </div>

          {/* Diagnosis */}
          <div className="space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              <Activity className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              Diagnosis
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {visit.diagnosis}
            </p>
          </div>

          {/* Prescription */}
          <div className="space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              <Pill className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              Prescription
            </h4>
            {visit.prescription.length === 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-300">None</p>
            ) : (
              <div className="space-y-2">
                {visit.prescription.map((med, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {med.medicineName}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {med.dosage} · {med.frequency} · {med.timing} ·{" "}
                      {med.duration}
                    </p>
                    {med.specialInstructions && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {med.specialInstructions}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Follow-up */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Follow-up
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {visit.followUp}
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handlePrint}
            >
              Print
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
