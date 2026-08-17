"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CalendarAppointment {
  id: number;
  patientId: string;
  time: string;
  patient: string;
  doctor: string;
  type: string;
  status: string;
  date: string;
}

interface AppointmentCalendarProps {
  appointments: CalendarAppointment[];
}

function useCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(i);
    return days;
  };
  const days = getDaysInMonth(selectedDate);
  const monthName = selectedDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const prevMonth = () =>
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1),
    );
  const nextMonth = () =>
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1),
    );
  const goToday = () => setSelectedDate(new Date());
  return { selectedDate, days, monthName, prevMonth, nextMonth, goToday };
}

export default function AppointmentCalendar({
  appointments,
}: AppointmentCalendarProps) {
  const { selectedDate, days, monthName, prevMonth, nextMonth, goToday } =
    useCalendar();
  const today = new Date();

  // Group appointment counts by date string
  const countByDay: Record<number, number> = {};
  appointments.forEach((a) => {
    const d = new Date(a.date);
    if (
      d.getFullYear() === selectedDate.getFullYear() &&
      d.getMonth() === selectedDate.getMonth()
    ) {
      countByDay[d.getDate()] = (countByDay[d.getDate()] ?? 0) + 1;
    }
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-gray-900">{monthName}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={goToday}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="bg-gray-50 p-3 text-center">
            <span className="text-sm text-gray-600">{d}</span>
          </div>
        ))}
        {days.map((day, index) => {
          const isToday =
            day === today.getDate() &&
            selectedDate.getMonth() === today.getMonth() &&
            selectedDate.getFullYear() === today.getFullYear();
          const count = day ? (countByDay[day] ?? 0) : 0;
          return (
            <div
              key={index}
              className={`bg-white p-3 min-h-[100px] ${day ? "hover:bg-blue-50 cursor-pointer" : ""}`}
            >
              {day && (
                <>
                  <span
                    className={`text-sm ${
                      isToday
                        ? "w-7 h-7 bg-blue-600 text-white rounded-full inline-flex items-center justify-center"
                        : "text-gray-900"
                    }`}
                  >
                    {day}
                  </span>
                  {count > 0 && (
                    <div className="mt-1 space-y-1">
                      <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded truncate">
                        {count} {count === 1 ? "appointment" : "appointments"}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
