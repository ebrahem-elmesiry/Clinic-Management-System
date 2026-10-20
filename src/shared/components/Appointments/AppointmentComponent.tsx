"use client";

import AppointmentModal from "@/shared/components/Appointments/AppointmentModal";
import AppointmentCalendarHook from "@/role/admin/hooks/AppointmentCalendarHook";
import AppointmentTable from "../Tables/AppointmentTable";
import AppointmentCalendar from "./AppointmentCalendar";
import AppointmentHeader from "./AppointmentHeader";

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
        <AppointmentHeader
          month={month}
          setMonth={setMonth}
          pending={pending}
          handleGetAppointmentDays={handleGetAppointmentDays}
          handleToday={handleToday}
        />

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
