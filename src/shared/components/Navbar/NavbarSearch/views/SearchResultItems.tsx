"use client";

import { Calendar } from "lucide-react";
import Avatar from "@/shared/components/Avatar";
import {
  SearchAppointment,
  SearchDoctor,
  SearchPatient,
} from "@/shared/types/navbarSearch";

const rowClass =
  "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/60 cursor-pointer";

export function SectionTitle({
  label,
  count,
}: {
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="text-xs text-gray-400 dark:text-gray-500">{count}</span>
    </div>
  );
}

export function PatientResultItem({ patient }: { patient: SearchPatient }) {
  return (
    <div className={rowClass}>
      <Avatar size="sm" src={patient.image} alt={patient.name} />
      <div className="min-w-0">
        <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
          {patient.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {patient.age} years
        </p>
      </div>
    </div>
  );
}

export function DoctorResultItem({ doctor }: { doctor: SearchDoctor }) {
  return (
    <div className={rowClass}>
      <Avatar size="sm" src={doctor.image} alt={doctor.name} />
      <div className="min-w-0">
        <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
          {doctor.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {doctor.specialty}
        </p>
      </div>
    </div>
  );
}

export function AppointmentResultItem({
  appointment,
}: {
  appointment: SearchAppointment;
}) {
  return (
    <div className={rowClass}>
      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-300" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
          {appointment.patientName}
          <span className="text-gray-400 dark:text-gray-500">
            {" · "}
            {appointment.date}
          </span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {appointment.doctorName}
        </p>
      </div>
    </div>
  );
}
