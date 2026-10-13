"use client";

import { Button } from "@/shared/components/ui/button";
import AppearanceCard from "@/shared/components/settings/Preferences/AppearanceCard";
import DangerZone from "@/shared/components/settings/Preferences/DangerZone";
import { toast } from "sonner";

export default function PreferencesPanel() {
  function handleSave() {
    toast.success("Settings saved successfully.");
  }
  return (
    <div className="space-y-6">
      <AppearanceCard />

      <DangerZone />

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
}
