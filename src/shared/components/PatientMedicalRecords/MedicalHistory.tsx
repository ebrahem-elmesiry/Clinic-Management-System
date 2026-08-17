"use client";

import React from "react";
import { FileText } from "lucide-react";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";

interface MedicalCondition {
  condition: string;
  diagnosedDate: string;
  status: string;
  severity: string;
  notes?: string;
}

interface MedicalHistoryProps {
  conditions: MedicalCondition[];
}

export default function MedicalHistory({ conditions }: MedicalHistoryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div>
          <h2 className="text-lg text-gray-900 dark:text-gray-100">Medical History</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your medical conditions and diagnoses</p>
        </div>
        <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
      </div>
      <div className="p-6">
        {conditions.length > 0 ? (
          <div className="space-y-4">
            {conditions.map((condition) => (
              <div key={condition.condition} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-gray-100 mb-1">{condition.condition}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Diagnosed: {condition.diagnosedDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={condition.status} />
                    <StatusBadge status={condition.severity} />
                  </div>
                </div>
                {condition.notes && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg mt-2">
                    {condition.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p>No medical history recorded</p>
          </div>
        )}
      </div>
    </div>
  );
}
