"use client";

import React from "react";
import { FileText } from "lucide-react";

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg text-gray-900">Medical History</h2>
          <p className="text-sm text-gray-500">Your medical conditions and diagnoses</p>
        </div>
        <FileText className="w-6 h-6 text-teal-600" />
      </div>
      <div className="p-6">
        {conditions.length > 0 ? (
          <div className="space-y-4">
            {conditions.map((condition) => (
              <div key={condition.condition} className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-gray-900 mb-1">{condition.condition}</p>
                    <p className="text-sm text-gray-500">Diagnosed: {condition.diagnosedDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      condition.status === 'Controlled' ? 'bg-green-100 text-green-700' :
                      condition.status === 'Ongoing' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {condition.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      condition.severity === 'Mild' ? 'bg-green-100 text-green-700' :
                      condition.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {condition.severity}
                    </span>
                  </div>
                </div>
                {condition.notes && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-2">
                    {condition.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No medical history recorded</p>
          </div>
        )}
      </div>
    </div>
  );
}
