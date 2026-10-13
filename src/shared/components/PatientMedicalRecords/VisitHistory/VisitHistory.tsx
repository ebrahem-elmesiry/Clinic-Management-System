"use client";

import { Button } from "@/shared/components/ui/button";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";
import WrapperComponent from "../../WrapperComponent";
import EmptyVisitHistory from "./EmptyVisitHistory";

export interface VisitPrescription {
  medicineName: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  specialInstructions?: string;
}

interface VisitRecord {
  patientId?: string;
  date: string;
  doctor: string;
  reason: string;
  diagnosis: string;
  prescription: VisitPrescription[];
  followUp: string;
}

interface VisitHistoryProps {
  visits: VisitRecord[];
  onViewDetails?: (visit: VisitRecord) => void;
}

export default function VisitHistory({
  visits,
  onViewDetails,
}: VisitHistoryProps) {
  return (
    <WrapperComponent title={"Previous Visits"}>
      <div className="space-y-4">
        {visits.length > 0 ? (
          visits.map((visit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-900 dark:text-gray-100 mb-1">
                    {visit.date}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {visit.doctor}
                  </p>
                </div>
                <StatusBadge status={visit.reason} />
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">
                    Diagnosis:
                  </p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {visit.diagnosis}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">
                    Prescription:
                  </p>
                  {visit.prescription.length === 0 ? (
                    <p className="text-gray-900 dark:text-gray-100">None</p>
                  ) : (
                    <div className="space-y-2">
                      {visit.prescription.map((med, i) => (
                        <div
                          key={i}
                          className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3"
                        >
                          <p className="font-medium text-gray-900 dark:text-gray-100">
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
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">
                    Follow-up: {visit.followUp}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails?.(visit)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyVisitHistory />
        )}
      </div>
    </WrapperComponent>
  );
}
