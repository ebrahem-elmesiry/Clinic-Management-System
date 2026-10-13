"use client";

import { Label } from "@/shared/components/ui/label";

interface AppointmentPreferencesProps {
  duration: string;
  bufferTime: string;
  onDurationChange: (value: string) => void;
  onBufferTimeChange: (value: string) => void;
}

export default function AppointmentPreferences({
  duration,
  bufferTime,
  onDurationChange,
  onBufferTimeChange,
}: AppointmentPreferencesProps) {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
      <h3 className="text-base font-medium text-gray-900 dark:text-slate-100 mb-5">
        Appointment Preferences
      </h3>

      <div className="space-y-5">
        <div>
          <Label htmlFor="appointmentDuration">
            Default Appointment Duration (minutes)
          </Label>
          <select
            id="appointmentDuration"
            value={duration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="w-full max-w-xs mt-2 px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>

        <div>
          <Label htmlFor="bufferTime">Buffer Time Between Appointments</Label>
          <select
            id="bufferTime"
            value={bufferTime}
            onChange={(e) => onBufferTimeChange(e.target.value)}
            className="w-full max-w-xs mt-2 px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="0">No buffer</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
          </select>
        </div>
      </div>
    </div>
  );
}