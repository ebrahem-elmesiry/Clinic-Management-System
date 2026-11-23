"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, format, parse, startOfMonth } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AppointmentHeaderProps {
  pending?: boolean;
}

export default function AppointmentHeader({ pending }: AppointmentHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const monthParam = searchParams.get("month");
  const currentMonth = monthParam
    ? parse(monthParam, "yyyy-MM", new Date())
    : new Date();

  function updateMonth(date: Date) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", format(date, "yyyy-MM"));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function goPrev() {
    updateMonth(addMonths(startOfMonth(currentMonth), -1));
  }

  function goNext() {
    updateMonth(addMonths(startOfMonth(currentMonth), 1));
  }

  function goToday() {
    updateMonth(startOfMonth(new Date()));
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl text-gray-900 dark:text-gray-100">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={goPrev}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={goToday}
          className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Today
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={goNext}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}
