import AppearanceCard from "@/shared/components/settings/Preferences/AppearanceCard";
import DangerZone from "@/shared/components/settings/Preferences/DangerZone";

export default function PreferencesPanel() {
  return (
    <div className="space-y-6">
      <AppearanceCard />

      <DangerZone />
    </div>
  );
}
