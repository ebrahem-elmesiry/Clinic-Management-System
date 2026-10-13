"use client";

import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";

interface WorkingDaysProps {
  workingDays: string[];
  allDays: string[];
  onToggleDay: (day: string) => void;
}

export default function WorkingDays({
  workingDays,
  allDays,
  onToggleDay,
}: WorkingDaysProps) {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
      <Label className="mb-3 block">Working Days</Label>

      <div className="flex flex-wrap gap-2">
        {allDays.map((day) => (
          <Button
            key={day}
            type="button"
            variant="outline"
            onClick={() => onToggleDay(day)}
            className={` ${
              workingDays.includes(day)
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                : "border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400"
            }`}
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
}
