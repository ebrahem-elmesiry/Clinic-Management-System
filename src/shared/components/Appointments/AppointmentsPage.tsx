"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppointmentFilter from "@/shared/components/Appointments/AppointmentFilter";
import PageTitleWithButton from "@/shared/components/page-title/PageTitleWithButton";
import AppointmentComponent from "@/shared/components/Appointments/AppointmentComponent";
import AppointmentHeaderAction from "@/shared/components/Appointments/AppointmentHeaderAction";
import { Appointment } from "@/shared/types/appointments";
import { toast } from "sonner";
import { useAppointmentContext } from "@/shared/context/AppointmentContext";

interface AppointmentsPageProps {
  initialAppointments: Appointment[];
}

export default function AppointmentsPage({
  initialAppointments,
}: AppointmentsPageProps) {
  const searchParams = useSearchParams();
  const { setAppointmentsDB, appointmentsDB } = useAppointmentContext();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    setPending(true);
    const timer = setTimeout(() => {
      setAppointmentsDB(initialAppointments);
      setPending(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [initialAppointments]);

  const filteredAppointments = useMemo(() => {
    const search = searchParams.get("search")?.toLowerCase().trim() ?? "";
    const status = searchParams.get("status");
    const doctor = searchParams.get("doctor")?.toLowerCase().trim() ?? "";

    return (
      appointmentsDB
        ?.filter((a) => a.patient.name.toLowerCase().trim().includes(search))
        .filter((a) => !status || a.status === status)
        .filter((a) => a.doctor.name.toLowerCase().trim().includes(doctor)) ||
      []
    );
  }, [searchParams, appointmentsDB]);

  function handleCancel(id: string) {
    setAppointmentsDB((prev) => prev.filter((ap) => ap.id !== id));
    toast.success("Appointment cancelled.");
  }

  return (
    <div className="space-y-6">
      <PageTitleWithButton
        title="Appointments Management"
        subtitle="Schedule and manage appointments"
        action={
          <Suspense fallback={null}>
            <AppointmentHeaderAction />
          </Suspense>
        }
      />
      <Suspense fallback={null}>
        <AppointmentFilter />
      </Suspense>

      <AppointmentComponent
        appointments={filteredAppointments}
        onCancel={handleCancel}
        pending={pending}
      />
    </div>
  );
}
