"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button";
import AppearanceCard from "@/shared/components/settings/Preferences/AppearanceCard";
import DataPrivacy from "@/shared/components/settings/Preferences/DataPrivacy";
import DangerZone from "@/shared/components/settings/Preferences/DangerZone";
import ClinicInfo from "@/role/admin/components/settings/ClinicInfo";
import AppointmentPreferences from "@/role/doctor/components/settings/AppointmentPreferences";

interface PreferencesPanelProps {
  userRole: "doctor" | "admin" | "patient";
  onSave: () => void;
}

export default function PreferencesPanel({
  userRole,
  onSave,
}: PreferencesPanelProps) {
  return (
    <div className="space-y-6">
      <AppearanceCard />

      {userRole === "admin" && <ClinicInfo />}
      {userRole === "doctor" && <AppointmentPreferences />}

      <DataPrivacy />
      <DangerZone />

      <div className="flex justify-end">
        <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 px-8">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
