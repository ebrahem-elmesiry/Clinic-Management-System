"use client";

import { useAuth } from "@/providers/AuthProvider";
import AddNewAppointmentModal from "@/role/patient/modals/AddNewAppointment";

export default function AppointmentHeaderAction() {
  const { role } = useAuth();

  if (role !== "patient") return null;

  return <AddNewAppointmentModal />;
}
