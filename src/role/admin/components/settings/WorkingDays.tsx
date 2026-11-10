import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { WEEK_DAYS } from "../../constants/clinicInfo";

interface WorkingDaysProps {
  workingDays: number[];
  onToggleDay: (day: number) => void;
}

export default function WorkingDays({
  workingDays,
  onToggleDay,
}: WorkingDaysProps) {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
      <Label className="mb-3 block">Working Days</Label>

      <div className="flex flex-wrap gap-2">
        {WEEK_DAYS.map((day) => (
          <Button
            key={day.value}
            type="button"
            variant="outline"
            onClick={() => onToggleDay(day.value)}
            className={` ${
              workingDays.includes(day.value)
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                : "border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400"
            }`}
          >
            {day.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
