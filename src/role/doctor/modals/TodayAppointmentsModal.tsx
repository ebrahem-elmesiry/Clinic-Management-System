"use client";

import { Clock, FileText, Phone, Stethoscope } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";
import type { TodayAppointment } from "@/role/doctor/types/type";

interface TodayAppointmentsModalProps {
  appointment: TodayAppointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TodayAppointmentsModal({
  appointment,
  open,
  onOpenChange,
}: TodayAppointmentsModalProps) {
  if (!appointment) return null;

  const initials = appointment.patient
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
        </DialogHeader>

        {/* Patient picture + name + age */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-teal-500 flex items-center justify-center shrink-0">
            <span className="text-white font-semibold">{initials}</span>
          </div>
          <div>
            <p className="text-gray-900 dark:text-gray-100 font-medium">
              {appointment.patient}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {appointment.age} years old · {appointment.gender}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Phone */}
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              {appointment.phone}
            </span>
          </div>

          {/* Appointment type (specialty) */}
          <div className="flex items-center gap-3 text-sm">
            <Stethoscope className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              {appointment.specialty}
            </span>
          </div>

          {/* Reason */}
          <div className="flex items-start gap-3 text-sm">
            <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
            <span className="text-gray-600 dark:text-gray-400">
              {appointment.reason}
            </span>
          </div>

          {/* Start - end time */}
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              {appointment.startTime} – {appointment.endTime}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="pt-2">
          <StatusBadge status={appointment.status} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
