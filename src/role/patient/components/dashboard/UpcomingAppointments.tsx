"use client";

import React from "react";
import { Calendar, Activity, MapPin } from "lucide-react";

interface UpcomingAppointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  type: string;
  location: string;
}

interface UpcomingAppointmentsProps {
  appointments: UpcomingAppointment[];
}

export default function UpcomingAppointments({
  appointments,
}: UpcomingAppointmentsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg text-gray-900">Upcoming Appointments</h2>
          <p className="text-sm text-gray-500">Your scheduled medical visits</p>
        </div>
        <Calendar className="w-6 h-6 text-blue-600" />
      </div>
      <div className="p-6">
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-gray-900 mb-1">{appointment.doctor}</p>
                    <p className="text-sm text-gray-500">
                      {appointment.specialty}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {appointment.type}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No upcoming appointments scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
