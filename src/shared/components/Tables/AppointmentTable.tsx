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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm text-gray-600">
              Time
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600">
              Patient
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600">
              Doctor
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600">
              Type
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {appointment.time}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-900">
                    {appointment.patient}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {appointment.doctor}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {appointment.type}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={appointment.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onEdit}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={onCancel}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg"
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
