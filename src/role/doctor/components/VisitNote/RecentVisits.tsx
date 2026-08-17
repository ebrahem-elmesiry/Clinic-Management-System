"use client";

import React from "react";

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg text-gray-900">Recent Visits</h2>
      </div>
      <div className="p-6 space-y-4">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-gray-900">{visit.patient}</p>
                <p className="text-xs text-gray-500">{visit.date}</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {visit.medicines} items
              </span>
            </div>
            <p className="text-xs text-gray-600">By {visit.doctor}</p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                View
              </button>
              <button className="flex-1 px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
