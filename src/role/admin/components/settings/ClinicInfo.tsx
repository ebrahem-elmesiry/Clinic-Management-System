"use client";

import { Button } from "@/shared/components/ui/button";
import ClinicInfoHook from "../../hooks/ClinicInfoHook";
import ClinicDetails from "./ClinicDetails";
import WorkingDays from "./WorkingDays";
import AppointmentPreferences from "./AppointmentPreferences";

export default function ClinicInfo() {
  const { clinicInfo, setClinicField, toggleDay, handleSave } =
    ClinicInfoHook();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-6">
        Clinic Information
      </h2>

      <ClinicDetails clinicInfo={clinicInfo} onChange={setClinicField} />

      <WorkingDays
        workingDays={clinicInfo.working_days}
        onToggleDay={toggleDay}
      />

      <AppointmentPreferences
        bufferTime={clinicInfo.bufferTime}
        duration={clinicInfo.duration}
        onChange={setClinicField}
      />

      <div className="flex justify-end">
        <Button type="button" onClick={handleSave} className="mt-4">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
