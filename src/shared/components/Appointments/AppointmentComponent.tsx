"use client";

import AppointmentTable from "@/shared/components/Tables/AppointmentTable";
import AppointmentHeader from "./AppointmentHeader";
import { Loader2 } from "lucide-react";
import { Appointment } from "@/shared/types/appointments";

interface AppointmentComponentProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
  pending: boolean;
}

export default function AppointmentComponent({
  appointments,
  onCancel,
  pending,
}: AppointmentComponentProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6">
      <div className={pending ? "pointer-events-none opacity-50" : ""}>
        <AppointmentHeader pending={pending} />

        <div className="overflow-x-auto overflow-y-hidden mt-6">
          {pending ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <AppointmentTable onCancel={onCancel} appointments={appointments} />
          )}
        </div>
      </div>
    </div>
  );
}
