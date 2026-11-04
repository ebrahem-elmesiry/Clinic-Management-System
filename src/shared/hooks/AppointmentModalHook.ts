"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function useAppointmentModalHook() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { role } = useAuth();

  const appointmentParam = searchParams.get("appointment");

  // doctor support later: role === "patient" || role === "doctor"
  const canCreateAppointment = role === "patient";

  const isCreateOpen = canCreateAppointment && appointmentParam === "create";

  function updateAppointmentParam(value?: "create") {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("appointment");

    if (value) {
      params.set("appointment", value);
    }

    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `${pathname}?${query}` : pathname,
    );
  }

  function openCreateModal() {
    if (!canCreateAppointment) return;
    updateAppointmentParam("create");
  }

  function closeCreateModal() {
    updateAppointmentParam();
  }

  return {
    isCreateOpen,
    openCreateModal,
    closeCreateModal,
  };
}
