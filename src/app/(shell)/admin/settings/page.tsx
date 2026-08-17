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

export default function AdminSettingsRoute() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    toast.success("Settings saved successfully.");
  };

  const profile = {
    name: "Admin User",
    email: "admin@clinic.com",
    phone: "(555) 100-0000",
    specialty: "System Administrator",
    license: "N/A",
    bio: "Clinic operations and system management.",
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-green-800">Settings saved successfully.</p>
        </div>
      )}

      <div className="flex gap-6">
        <TabTitle tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 min-w-0">
          {activeTab === "profile" && (
            <ProfilePanel userRole="admin" profile={profile} onSave={handleSave} />
          )}
          {activeTab === "notifications" && (
            <NotificationsPanel userRole="admin" onSave={handleSave} />
          )}
          {activeTab === "security" && <SecurityPanel />}
          {activeTab === "preferences" && (
            <PreferencesPanel userRole="admin" onSave={handleSave} />
          )}
        </div>
      </div>
    </div>
  );
}
