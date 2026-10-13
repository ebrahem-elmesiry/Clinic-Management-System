"use client";

import { Button } from "@/shared/components/ui/button";
import ClinicInfoHook from "../../hooks/ClinicInfoHook";
import ClinicDetails from "./ClinicDetails";
import WorkingDays from "./WorkingDays";
import AppointmentPreferences from "./AppointmentPreferences";

const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const defaultWorkingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const defaultTime = { start: "09:00", end: "18:00" };
const defaultDuration = "30";
const defaultBufferTime = "10";

export default function ClinicInfo() {
  const {
    clinicName,
    setClinicName,
    time,
    setHandleTime,
    workingDays,
    toggleDay,
    duration,
    setDuration,
    bufferTime,
    setBufferTime,
    handleSave,
  } = ClinicInfoHook({
    defaultWorkingDays,
    defaultDuration,
    defaultBufferTime,
    defaultTime,
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-6">
        Clinic Information
      </h2>

      <ClinicDetails
        clinicName={clinicName}
        startTime={time.start}
        endTime={time.end}
        onClinicNameChange={setClinicName}
        setHandleTime={setHandleTime}
      />

      <WorkingDays
        workingDays={workingDays}
        allDays={allDays}
        onToggleDay={toggleDay}
      />

      <AppointmentPreferences
        duration={duration}
        bufferTime={bufferTime}
        onDurationChange={setDuration}
        onBufferTimeChange={setBufferTime}
      />

      <div className="flex justify-end">
        <Button type="button" onClick={handleSave} className="mt-4">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
