"use client";

import React, { useState } from "react";
import { User, Bell, Shield, Building2, Check } from "lucide-react";
import { toast } from "sonner";
import TabTitle, { type SettingsTab, type SettingsTabItem } from "@/shared/components/settings/TabTitle";
import ProfilePanel from "@/shared/components/settings/ProfilePanel";
import NotificationsPanel from "@/shared/components/settings/NotificationsPanel";
import SecurityPanel from "@/shared/components/settings/SecurityPanel";
import PreferencesPanel from "@/shared/components/settings/PreferencesPanel";

const tabs: SettingsTabItem[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "preferences", label: "Preferences", icon: Building2 },
];

export default function PatientSettingsRoute() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    toast.success("Settings saved successfully.");
  };

  const profile = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    specialty: "N/A",
    license: "N/A",
    bio: "",
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-slate-100 mb-1">Settings</h1>
        <p className="text-gray-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl dark:bg-green-900/20 dark:border-green-800/50">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center dark:bg-green-900/30">
            <Check className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-green-800 dark:text-green-200">Settings saved successfully.</p>
        </div>
      )}

      <div className="flex gap-6">
        <TabTitle tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 min-w-0">
          {activeTab === "profile" && (
            <ProfilePanel userRole="patient" profile={profile} onSave={handleSave} />
          )}
          {activeTab === "notifications" && (
            <NotificationsPanel userRole="patient" onSave={handleSave} />
          )}
          {activeTab === "security" && <SecurityPanel />}
          {activeTab === "preferences" && (
            <PreferencesPanel userRole="patient" onSave={handleSave} />
          )}
        </div>
      </div>
    </div>
  );
}
