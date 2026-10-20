"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import type {
  Appointment,
  AppointmentWithDoctor,
} from "@/role/admin/types/appointment";

export default function AppointmentModalHook(groups: AppointmentWithDoctor[]) {
  const router = useRouter();
  const { role } = useAuth();
  const isDoctor = role === "doctor";
  const isPatient = role === "patient";

  function handleStart(appointmentId: string) {
    router.push(`/doctor/visit-notes?appointment_id=${appointmentId}`);
  }

  function toMinutes(time: string) {
    const [hour = "0", minute = "0"] = time.split(":");
    return Number(hour) * 60 + Number(minute);
  }

  function byMorningFirst(a: Appointment, b: Appointment) {
    return toMinutes(a.start_time) - toMinutes(b.start_time);
  }

  const sorted = groups
    .filter((group) => group.appointments.length > 0)
    .map((group) => ({
      ...group,
      appointments: [...group.appointments].sort(byMorningFirst),
    }))
    .sort(
      (a, b) =>
        toMinutes(a.appointments[0]?.start_time ?? "00:00") -
        toMinutes(b.appointments[0]?.start_time ?? "00:00"),
    );

  const appointmentDoctor = groups.map((g) => g.appointments).flat();

  const count = isDoctor
    ? appointmentDoctor.length
    : sorted.reduce((total, group) => total + group.appointments.length, 0);

  return {
    isDoctor,
    isPatient,
    handleStart,
    sorted,
    appointmentDoctor,
    count,
  };
}
