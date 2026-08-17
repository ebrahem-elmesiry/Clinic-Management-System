"use client";

import React from "react";
import { Activity } from "lucide-react";

interface RecentVisit {
  id: number;
  date: string;
  doctor: string;
  reason: string;
  diagnosis: string;
  notes?: string;
}

interface RecentVisitsProps {
  visits: RecentVisit[];
}

export default function RecentVisits({ visits }: RecentVisitsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
      <div className="p-6 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-lg text-gray-900 dark:text-slate-100">Recent Visits</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400">Your latest medical consultations</p>
      </div>
      <div className="p-6">
        {visits.length > 0 ? (
          <div className="space-y-4">
            {visits.map((visit) => (
              <div
                key={visit.id}
                className="border-b border-gray-100 dark:border-slate-700/50 last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-gray-500 dark:text-slate-400">{visit.date}</p>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 text-xs rounded">
                    {visit.reason}
                  </span>
                </div>
                <p className="text-gray-900 dark:text-slate-100 mb-1">{visit.doctor}</p>
                <p className="text-sm text-gray-600 dark:text-slate-300 mb-2">{visit.diagnosis}</p>
                {visit.notes && (
                  <p className="text-xs text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-700/50 p-2 rounded">
                    {visit.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-slate-400">
            <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-slate-600" />
            <p>No recent visits</p>
          </div>
        )}
      </div>
    </div>
  );
}
