"use client";

import React from "react";
import WrapperComponent from "@/shared/components/WrapperComponent";

interface RecentVisit {
  id: number;
  patient: string;
  date: string;
  medicines: number;
  doctor: string;
}

interface RecentVisitsProps {
  visits: RecentVisit[];
}

export default function RecentVisits({ visits }: RecentVisitsProps) {
  return (
    <WrapperComponent title="Recent Visits">
      <div className="space-y-4">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-gray-900 dark:text-slate-100">{visit.patient}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">{visit.date}</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 text-xs rounded-full">
                {visit.medicines} items
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-slate-300">By {visit.doctor}</p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 px-3 py-1 text-xs border border-gray-300 dark:border-slate-600 rounded hover:bg-gray-50 dark:hover:bg-slate-700/50">
                View
              </button>
              <button className="flex-1 px-3 py-1 text-xs border border-gray-300 dark:border-slate-600 rounded hover:bg-gray-50 dark:hover:bg-slate-700/50">
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </WrapperComponent>
  );
}
