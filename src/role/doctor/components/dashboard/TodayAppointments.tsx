"use client";

import React from "react";
import AppointmentCard from "@/shared/components/Appointments/AppointmentCard";

interface TodayAppointment {
  id: number;
  time: string;
  patient: string;
  reason: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'cancelled';
}

interface TodayAppointmentsProps {
  appointments: TodayAppointment[];
}

export default function TodayAppointments({ appointments }: TodayAppointmentsProps) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
      <div className="p-6 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-lg text-gray-900 dark:text-slate-100">Today's Appointments</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400">Manage your schedule</p>
      </div>
      <div className="p-6 space-y-4">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} {...appointment} />
        ))}
      </div>
    </div>
  );
}
