"use client";

import { useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { CalendarClock } from "lucide-react";
import AddNewAppointmentModal from "@/role/patient/modals/AddNewAppointment";
import type { FollowUpAppointment } from "../../types/type";

interface FollowUpProps {
  followUp: boolean;
  nextAppointment: FollowUpAppointment | null;
  patientName: string;
  specialty: string;
  appointmentType: string;
  onNo: () => void;
  onSchedule: (data: FollowUpAppointment) => void;
}

export default function FollowUp({
  followUp,
  nextAppointment,
  patientName,
  specialty,
  appointmentType,
  onNo,
  onSchedule,
}: FollowUpProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const showSummary = followUp && nextAppointment;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg text-gray-900 dark:text-slate-100">
            Follow-up
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Does the patient need to come back?
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setModalOpen(true)}
            className={`px-3 py-1.5 text-sm border rounded-lg ${showSummary || modalOpen ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"}`}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setModalOpen(false);
              onNo();
            }}
            className={`px-3 py-1.5 text-sm border rounded-lg ${!showSummary && !modalOpen ? "bg-gray-800 text-white border-gray-800" : "border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"}`}
          >
            No
          </button>
        </div>
      </div>

      {showSummary ? (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
          <p className="text-sm text-gray-900 dark:text-slate-100 mb-3">
            Follow-up scheduled
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">Date</p>
              <p className="text-sm text-gray-900 dark:text-slate-100">
                {isValid(parseISO(nextAppointment.date))
                  ? format(parseISO(nextAppointment.date), "MMM d, yyyy")
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Specialty
              </p>
              <p className="text-sm text-gray-900 dark:text-slate-100">
                {nextAppointment.specialty || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">Time</p>
              <p className="text-sm text-gray-900 dark:text-slate-100">
                {nextAppointment.time || "—"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-1">
          <CalendarClock className="w-3.5 h-3.5" />
          No follow-up scheduled.
        </p>
      )}

      <AddNewAppointmentModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        showTrigger={false}
        patientName={patientName}
        specialty={specialty}
        appointmentType={appointmentType}
        onSchedule={onSchedule}
      />
    </div>
  );
}
