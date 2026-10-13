"use client";

import { useCallback, useEffect, useState } from "react";
import { isSameMonth, startOfMonth } from "date-fns";
import {
  APPOINTMENT_DAYS,
  appointmentWithDoctors,
  DEFAULT_VIEW,
} from "@/role/admin/constants/appointments";
import type { AppointmentWithDoctor } from "@/role/admin/types/appointment";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export default function AppointmentCalendarHook() {
  const [month, setMonth] = useState<Date>(new Date());
  const [pending, setPending] = useState(false);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [appointmentDays, setAppointmentDays] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<AppointmentWithDoctor[]>([]);
  const [selection, setSelection] = useState<Date | null>(null);

  const handleGetAppointmentDays = useCallback(async () => {
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAppointmentDays(APPOINTMENT_DAYS);
    setPending(false);
  }, []);

  useEffect(() => {
    handleGetAppointmentDays();
  }, [handleGetAppointmentDays]);

  async function handleRequest(dates: Date[]): Promise<boolean> {
    const requested = dates.map(toDateKey);
    if (!requested.every((key) => appointmentDays.includes(key))) return false;
    if (isLoadingAppointments) return false;

    setIsLoadingAppointments(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const wanted = new Set(requested);
    setAppointments(
      appointmentWithDoctors
        .map((group) => ({
          ...group,
          appointments: group.appointments.filter((a) => wanted.has(a.date)),
        }))
        .filter((group) => group.appointments.length > 0),
    );
    setIsLoadingAppointments(false);
    return true;
  }

  async function handleDay(date: Date, outside: boolean) {
    if (pending || isLoadingAppointments) return;
    if (outside) setMonth(startOfMonth(date));
    if (!appointmentDays.includes(toDateKey(date))) return;
    setSelection(date);
    await handleRequest([date]);
  }

  function handleToday() {
    const now = new Date();
    if (isSameMonth(month, now)) return;
    handleGetAppointmentDays();
    setMonth(now);
  }
  const handleCancel = () => toast.error("Appointment cancelled.");
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? DEFAULT_VIEW;

  return {
    month,
    setMonth,
    pending,
    isLoadingAppointments,
    appointmentDays,
    appointments,
    selection,
    setSelection,
    handleDay,
    handleToday,
    handleGetAppointmentDays,
    handleCancel,
    view,
  };
}
