"use client";

import React from 'react';
import { Clock, User, FileText } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import StatusBadge from './StatusBadge';

interface AppointmentCardProps {
  time: string;
  patient: string;
  reason: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'cancelled';
}

export default function AppointmentCard({ time, patient, reason, status }: AppointmentCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
          <Clock className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-gray-900 dark:text-gray-100">{time}</p>
          <StatusBadge status={status} />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
          <User className="w-4 h-4" />
          <span>{patient}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
          <FileText className="w-4 h-4" />
          <span>{reason}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {status === 'upcoming' && (
          <>
            <Button size="sm">Start</Button>
            <Button variant="outline" size="sm">Reschedule</Button>
          </>
        )}
        {status === 'in-progress' && (
          <Button variant="success" size="sm">Complete</Button>
        )}
        {status === 'completed' && (
          <Button variant="outline" size="sm">View Details</Button>
        )}
      </div>
    </div>
  );
}
