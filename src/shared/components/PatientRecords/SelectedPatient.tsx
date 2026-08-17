"use client";

import React from "react";
import { User, ChevronRight } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

interface PatientListItem {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  lastVisit: string;
}

interface SelectedPatientProps {
  patients: PatientListItem[];
  selectedPatient: number | null;
  onSelect: (id: number) => void;
}

export default function SelectedPatient({
  patients,
  selectedPatient,
  onSelect,
}: SelectedPatientProps) {
  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <Input placeholder="Search patients..." />
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
        {patients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => onSelect(patient.id)}
            className={`w-full p-4 border-b border-gray-100 text-left hover:bg-blue-50 transition-colors ${
              selectedPatient === patient.id
                ? "bg-blue-50 border-l-4 border-l-blue-600"
                : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">
                  {patient.name}
                </p>
                <p className="text-xs text-gray-500">
                  {patient.age} yrs • {patient.gender}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Last visit: {patient.lastVisit}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
