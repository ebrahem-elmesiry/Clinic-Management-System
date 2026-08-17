"use client";

import React from 'react';
import { Clock, User, FileText } from 'lucide-react';

interface AppointmentCardProps {
  time: string;
  patient: string;
  reason: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'cancelled';
}

export default function AppointmentCard({ time, patient, reason, status }: AppointmentCardProps) {
  const statusConfig = {
    completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completed' },
    'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Progress' },
    upcoming: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Upcoming' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
          <Clock className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-gray-900">{time}</p>
          <span className={`px-2 py-1 rounded-full text-xs ${config.bg} ${config.text}`}>
            {config.label}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <User className="w-4 h-4" />
          <span>{patient}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FileText className="w-4 h-4" />
          <span>{reason}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {status === 'upcoming' && (
          <>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
              Start
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
              Reschedule
            </button>
          </>
        )}
        {status === 'in-progress' && (
          <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
            Complete
          </button>
        )}
        {status === 'completed' && (
          <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
            View Details
          </button>
        )}
      </div>
    </div>
  );
}
