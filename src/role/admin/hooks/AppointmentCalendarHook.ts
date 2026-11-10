"use client";

import { useCallback, useEffect, useState } from "react";
import { endOfMonth, isSameMonth, startOfMonth, format } from "date-fns";
import { toast } from "sonner";
import { useAppointmentContext } from "@/shared/context/AppointmentContext";

export default function AppointmentCalendarHook() {
  const [month, setMonth] = useState<Date>(new Date());
  const [pending, setPending] = useState(false);

  const { setAppointmentsDB, appointmentsDB } = useAppointmentContext();
  const now = new Date();
  const handleGetAppointmentDays = useCallback(
    async (
      range: { start: string; end: string } = {
        start: format(startOfMonth(now), "yyyy-MM-dd"),
        end: format(endOfMonth(now), "yyyy-MM-dd"),
      },
    ) => {
      setPending(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const currentAppointmentMonth = appointmentsDB.filter(
        (a) => a.start === range?.start && a.end === range.end,
      );
      setAppointmentsDB(currentAppointmentMonth);
      setPending(false);
    },
    [setAppointmentsDB],
  );

  useEffect(() => {
    handleGetAppointmentDays();
  }, [handleGetAppointmentDays]);

  function handleToday() {
    const now = new Date();
    if (isSameMonth(month, now)) return;
    setMonth(now);
    handleGetAppointmentDays();
  }

  function handleCancel(id: string, dateDay: string) {
    const date = new Date(dateDay);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const firstDay = `${year}-${month}-01`;
    setAppointmentsDB((prev) =>
      prev.map((a) =>
        a.start === firstDay
          ? { ...a, appointments: a.appointments.filter((ap) => ap.id !== id) }
          : a,
      ),
    );
    toast.success("Appointment cancelled.");
  }

  return {
    month,
    setMonth,
    pending,
    handleToday,
    handleGetAppointmentDays,
    handleCancel,
    appointments: appointmentsDB,
  };
}
