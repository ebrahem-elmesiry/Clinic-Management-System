"use client";

import { User } from "lucide-react";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";
import { appointmentWithDoctors } from "@/role/admin/constants/appointments";
import { Button } from "../ui/button";

interface AppointmentTableProps {
  onCancel: () => void;
}

export default function AppointmentTable({ onCancel }: AppointmentTableProps) {
  const rows = appointmentWithDoctors
    .flatMap((group) =>
      group.appointments.map((appointment) => ({
        appointment,
        doctor: group.doctor,
      })),
    )
    .sort(
      (a, b) =>
        a.appointment.date.localeCompare(b.appointment.date) ||
        a.appointment.start_time.localeCompare(b.appointment.start_time),
    );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-160">
          <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
                Patient
              </th>
              <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
                Time
              </th>
              <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
                Doctor
              </th>
              <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
                Reason
              </th>
              <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {rows.map(({ appointment, doctor }) => {
              return (
                <tr
                  key={appointment.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {appointment.patient?.name ?? "Unknown patient"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
                      {appointment.start_time} to {appointment.end_time}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {doctor.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {appointment.reason}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={appointment.status} />
                  </td>
                  <td className="px-6 py-4">{appointment.date}</td>
                  <td className="px-6 py-4">
                    <Button variant={"outline-danger"} onClick={onCancel}>
                      Cancel
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
