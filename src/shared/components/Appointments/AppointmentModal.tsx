"use client";

import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import AppointmentModalHook from "@/shared/hooks/AppointmentModalHook";
import type { AppointmentWithDoctor } from "@/role/admin/types/appointment";

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | null;
  groups: AppointmentWithDoctor[];
  loading?: boolean;
}

export default function AppointmentModal({
  open,
  date,
  groups,
  onOpenChange,
  loading = false,
}: AppointmentModalProps) {
  const { isDoctor, isPatient, handleStart, sorted, appointmentDoctor, count } =
    AppointmentModalHook(groups);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {date ? format(date, "EEEE, MMMM d, yyyy") : "Appointments"}
          </DialogTitle>
          <DialogDescription>
            {loading
              ? "Loading appointments…"
              : `${count} ${count === 1 ? "appointment" : "appointments"}`}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="sr-only">Loading appointments</span>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {count === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No appointments on this day.
              </p>
            )}
            {isDoctor || isPatient ? (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {appointmentDoctor.map((appointment) => {
                  const cancelled = appointment.status === "cancelled";

                  return (
                    <div
                      key={appointment.id}
                      className={`flex items-start justify-between gap-3 py-2.5 ${cancelled ? "opacity-60" : ""}`}
                    >
                      <div className="min-w-0">
                        <p
                          className={`flex gap-1 text-sm font-medium text-gray-900 dark:text-gray-100 ${cancelled ? "line-through" : ""}`}
                        >
                          {appointment.patient?.name ?? "Unknown patient"}
                          <span className="font-normal text-gray-500 dark:text-gray-400">
                            {" "}
                            · {appointment.patient?.age ?? "—"} yrs
                          </span>
                          <StatusBadge
                            status={appointment.status}
                            className="px-2 py-0.5 text-[10px]"
                          />
                        </p>
                        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                          {appointment.reason}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {appointment.start_time}
                        </span>
                        {isDoctor && !cancelled && (
                          <Button
                            size="sm"
                            onClick={() => handleStart(appointment.id)}
                          >
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              sorted.map((group, index) => (
                <div
                  key={group.doctor.id}
                  className={index > 0 ? "mt-4 dark:border-gray-700" : ""}
                >
                  <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-900/50">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {group.doctor.name}
                      </p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {group.doctor.specialty_name}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">
                      {group.appointments.length}
                    </span>
                  </div>

                  <div className="p-2 divide-y divide-gray-100 dark:divide-gray-800">
                    {group.appointments.map((appointment) => {
                      const cancelled = appointment.status === "cancelled";

                      return (
                        <div
                          key={appointment.id}
                          className={`flex flex-wrap items-start justify-between gap-3 py-2.5 ${cancelled ? "opacity-60" : ""}`}
                        >
                          <div className="min-w-0">
                            <p
                              className={`flex gap-1 text-sm font-medium text-gray-900 dark:text-gray-100 ${cancelled ? "line-through" : ""}`}
                            >
                              {appointment.patient?.name ?? "Unknown patient"}
                              <span className="font-normal text-gray-500 dark:text-gray-400">
                                {" "}
                                · {appointment.patient?.age ?? "—"} yrs
                              </span>
                              <StatusBadge
                                status={appointment.status}
                                className="px-2 py-0.5 text-[10px]"
                              />
                            </p>
                            <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                              {appointment.reason}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                              {appointment.start_time}{" "}
                              {appointment.start_period} to{" "}
                              {appointment.end_time} {appointment.end_period}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
