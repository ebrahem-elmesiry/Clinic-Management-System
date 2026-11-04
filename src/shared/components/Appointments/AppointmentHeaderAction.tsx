"use client";

import { useAuth } from "@/providers/AuthProvider";
import AddNewAppointmentModal from "@/role/patient/modals/addNewAppointment/AddNewAppointment";
import useAppointmentModalHook from "@/shared/hooks/AppointmentModalHook";

export default function AppointmentHeaderAction() {
  const { role } = useAuth();
  const { isCreateOpen, openCreateModal, closeCreateModal } =
    useAppointmentModalHook();

  if (role !== "patient") return null;

  return (
    <AddNewAppointmentModal
      open={isCreateOpen}
      onOpenChange={(open: boolean) => (open ? openCreateModal() : closeCreateModal())}
    />
  );
}
