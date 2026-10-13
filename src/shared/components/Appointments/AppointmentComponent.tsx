"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import AppointmentModal from "@/shared/components/Appointments/AppointmentModal";
import AppointmentCalendarHook from "@/role/admin/hooks/AppointmentCalendarHook";
import AppointmentTable from "../Tables/AppointmentTable";
import AppointmentCalendar from "./AppointmentCalendar";

export default function AppointmentComponent() {
  const {
    month,
    setMonth,
    pending,
    isLoadingAppointments,
    appointmentDays,
    appointments,
    selection,
    setSelection,
    handleDay,
    handleToday,
    handleGetAppointmentDays,
    handleCancel,
    view,
  } = AppointmentCalendarHook();

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6">
      <div className={pending ? "pointer-events-none opacity-50" : ""}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl text-gray-900 dark:text-gray-100">
            {month.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                handleGetAppointmentDays();
                setMonth(new Date(month.getFullYear(), month.getMonth() - 1));
              }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={handleToday}
              className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Today
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                handleGetAppointmentDays();
                setMonth(new Date(month.getFullYear(), month.getMonth() + 1));
              }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          {view === "calendar" ? (
            <AppointmentCalendar
              month={month}
              setMonth={setMonth}
              appointmentDays={appointmentDays}
              handleDay={handleDay}
            />
          ) : (
            <AppointmentTable onCancel={handleCancel} />
          )}
        </div>
      </div>

      <AppointmentModal
        open={selection !== null}
        onOpenChange={(open) => {
          if (!open) setSelection(null);
        }}
        date={selection}
        groups={appointments}
        loading={isLoadingAppointments}
      />
    </div>
  );
}
