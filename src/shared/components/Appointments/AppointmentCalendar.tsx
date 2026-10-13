import { Calendar, CalendarDayButton } from "@/shared/components/ui/calendar";
import type { DayButtonProps } from "react-day-picker";
import { toDateKey } from "@/role/admin/hooks/AppointmentCalendarHook";
import { Dispatch, SetStateAction } from "react";

interface AppointmentCalendarProps {
  month: Date;
  setMonth: Dispatch<SetStateAction<Date>>;
  handleDay: (date: Date, outside: boolean) => void;
  appointmentDays: string[];
}

export default function AppointmentCalendar({
  month,
  setMonth,
  handleDay,
  appointmentDays,
}: AppointmentCalendarProps) {
  return (
    <Calendar
      month={month}
      onMonthChange={setMonth}
      weekStartsOn={0}
      showOutsideDays={true}
      className="w-full min-w-120 p-0"
      onDayClick={(date, modifiers) => void handleDay(date, modifiers.outside)}
      classNames={{
        root: "w-full dark:bg-slate-800 rounded-lg",
        months: "w-full",
        month: "w-full",
        month_grid: "w-full border-collapse",
        day: "h-[118px] w-full p-1 align-top hover:dark:bg-slate-900 rounded-md duration-300",
        nav: "hidden",
        button_previous: "hidden",
        button_next: "hidden",
        today: "dark:bg-slate-900",
      }}
      components={{
        DayButton: (props: DayButtonProps) => {
          const outside = props.modifiers.outside;
          const isToday = props.modifiers.today;
          const dayKey = toDateKey(props.day.date);
          const booked = !outside && appointmentDays.includes(dayKey);

          return (
            <div
              className={`group relative bg-white dark:bg-slate-900 p-2.5 min-h-29.5 border border-gray-200 dark:border-slate-800 rounded-lg transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 ${outside ? "opacity-45 bg-gray-50 dark:bg-slate-900/40" : ""}`}
            >
              <div className="flex h-7 items-center justify-center">
                <div className="relative">
                  {booked && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-0.5 rounded-full border-2 border-blue-500/70 dark:border-violet-400/70"
                    />
                  )}
                  <CalendarDayButton
                    {...props}
                    className={`w-7 h-7 min-w-0 inline-flex items-center justify-center rounded-full text-[13px] font-medium ${isToday ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-200 dark:bg-linear-to-br dark:from-violet-600 dark:to-indigo-600 dark:text-white dark:ring-violet-900 dark:ring-2 bg-linear-to-br from-blue-600 to-teal-500" : "text-gray-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-violet-400"}`}
                  />
                </div>
              </div>
            </div>
          );
        },
      }}
    />
  );
}
