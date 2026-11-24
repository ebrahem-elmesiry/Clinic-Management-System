import { format, isValid, parseISO } from "date-fns";
import { CalendarClock } from "lucide-react";
import { FollowUpAppointment } from "../../types/type";

interface FollowUpSummaryProps {
  nextAppointment: FollowUpAppointment | null;
}

export default function FollowUpSummary({
  nextAppointment,
}: FollowUpSummaryProps) {
  if (!nextAppointment) {
    return (
      <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-1">
        <CalendarClock className="w-3.5 h-3.5" />
        No follow-up scheduled.
      </p>
    );
  }

  const parsedDate = parseISO(nextAppointment.date);

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
      <p className="text-sm text-gray-900 dark:text-slate-100 mb-3">
        Follow-up scheduled
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-gray-500 dark:text-slate-400">Date</p>
          <p className="text-sm text-gray-900 dark:text-slate-100">
            {isValid(parsedDate) ? format(parsedDate, "MMM d, yyyy") : "—"}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-slate-400">Specialty</p>
          <p className="text-sm text-gray-900 dark:text-slate-100">
            {nextAppointment.specialty}
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
  );
}
