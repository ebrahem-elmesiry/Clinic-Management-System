"use client";

import React from "react";
import AppointmentCard from "@/shared/components/Appointments/AppointmentCard";
import WrapperComponent from "@/shared/components/WrapperComponent";

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
    <WrapperComponent
      title="Today's Appointments"
      description="Manage your schedule"
      className="lg:col-span-2"
    >
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} {...appointment} />
        ))}
      </div>
    </WrapperComponent>
  );
}
