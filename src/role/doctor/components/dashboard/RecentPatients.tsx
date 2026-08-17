"use client";

import React from "react";

interface RecentPatient {
  name: string;
  lastVisit: string;
  condition: string;
  status: 'green' | 'yellow' | 'orange';
}

interface RecentPatientsProps {
  patients: RecentPatient[];
}

const statusDotColor = {
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
};

export default function RecentPatients({ patients }: RecentPatientsProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
      <div className="p-6 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-lg text-gray-900 dark:text-slate-100">Recent Patients</h2>
      </div>
      <div className="p-6 space-y-4">
        {patients.map((patient, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-900 dark:text-slate-100">{patient.name}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">{patient.lastVisit}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${statusDotColor[patient.status]}`}></div>
              <span className="text-xs text-gray-600 dark:text-slate-300">{patient.condition}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
