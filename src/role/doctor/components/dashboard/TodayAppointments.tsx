"use client";

import { useState } from "react";
import AppointmentCard from "@/shared/components/Appointments/AppointmentCard";
import WrapperComponent from "@/shared/components/WrapperComponent";
import TodayAppointmentsModal from "@/role/doctor/modals/TodayAppointmentsModal";
import type { TodayAppointment } from "@/role/doctor/types/type";

interface TodayAppointmentsProps {
  appointments: TodayAppointment[];
}

export default function TodayAppointments({
  appointments,
}: TodayAppointmentsProps) {
  const [selected, setSelected] = useState<TodayAppointment | null>(null);

  return (
    <WrapperComponent
      title="Today's Appointments"
      description="Manage your schedule"
      className="lg:col-span-2"
    >
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            time={appointment.startTime}
            patient={appointment.patient}
            reason={appointment.reason}
            status={appointment.status}
            onViewDetails={() => setSelected(appointment)}
          />
        ))}
      </div>

      <TodayAppointmentsModal
        appointment={selected}
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </WrapperComponent>
  );
}
