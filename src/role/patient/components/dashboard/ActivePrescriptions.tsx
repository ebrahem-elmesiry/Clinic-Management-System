"use client";

import React from "react";
import { Pill } from "lucide-react";

interface ActivePrescription {
  id: number;
  medicine: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  remainingDays: number;
  prescribedBy: string;
  instructions?: string;
}

interface ActivePrescriptionsProps {
  prescriptions: ActivePrescription[];
}

export default function ActivePrescriptions({
  prescriptions,
}: ActivePrescriptionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg text-gray-900">Active Prescriptions</h2>
          <p className="text-sm text-gray-500">Current medications</p>
        </div>
        <Pill className="w-6 h-6 text-purple-600" />
      </div>
      <div className="p-6">
        {prescriptions.length > 0 ? (
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-blue-50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-gray-900 mb-1">
                      {prescription.medicine}
                    </p>
                    <p className="text-xs text-gray-500">
                      by {prescription.prescribedBy}
                    </p>
                  </div>
                  <Pill className="w-5 h-5 text-purple-600" />
                </div>

                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dosage:</span>
                    <span className="text-gray-900">
                      {prescription.dosage}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="text-gray-900">
                      {prescription.frequency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timing:</span>
                    <span className="text-gray-900">
                      {prescription.timing}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="text-gray-900">
                      {prescription.duration}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200">
                  <span className="text-sm text-gray-600">Days remaining:</span>
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

                {prescription.instructions && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Instructions:</p>
                    <p className="text-xs text-gray-900">
                      {prescription.instructions}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Pill className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No active prescriptions</p>
          </div>
        )}
      </div>
    </div>
  );
}
