"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface VisitRecord {
  date: string;
  doctor: string;
  reason: string;
  diagnosis: string;
  prescription: string;
  followUp: string;
}

interface VisitHistoryProps {
  visits: VisitRecord[];
  staff?: boolean;
}

export default function VisitHistory({ visits, staff = false }: VisitHistoryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-gray-900">Previous Visits</h3>
        {staff && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Visit
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {visits.map((visit, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-900 mb-1">{visit.date}</p>
                <p className="text-sm text-gray-500">{visit.doctor}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {visit.reason}
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Diagnosis:</p>
                <p className="text-gray-900">{visit.diagnosis}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Prescription:</p>
                <p className="text-gray-900">{visit.prescription}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-500">
                  Follow-up: {visit.followUp}
                </span>
                {staff && (
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
