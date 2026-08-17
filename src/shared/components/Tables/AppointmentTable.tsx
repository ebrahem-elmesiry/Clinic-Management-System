"use client";

import React from "react";
import { Clock, User } from "lucide-react";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";
import type { CalendarAppointment } from "@/shared/components/Appointments/AppointmentCalendar";

interface AppointmentTableProps {
  appointments: CalendarAppointment[];
  onEdit: () => void;
  onCancel: () => void;
}

export default function AppointmentTable({
  appointments,
  onEdit,
  onCancel,
}: AppointmentTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
              Time
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
              Patient
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
              Doctor
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
              Type
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
                  <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  {appointment.time}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {appointment.patient}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {appointment.doctor}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {appointment.type}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={appointment.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onEdit}
                    className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={onCancel}
                    className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
