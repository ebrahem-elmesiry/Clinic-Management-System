"use client";

import React, { Suspense } from "react";
import { User, Bell, Shield, Building2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TabTitle, {
  type SettingsTab,
  type SettingsTabItem,
} from "@/shared/components/settings/TabTitle";
import ProfilePanel from "@/shared/components/settings/tabs/ProfilePanel";
import NotificationsPanel from "@/shared/components/settings/tabs/Notifications/NotificationsPanel";
import PreferencesPanel from "@/shared/components/settings/tabs/PreferencesPanel";
import SecurityPanel from "@/shared/components/settings/tabs/SecurityPanel";

const tabs: SettingsTabItem[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "preferences", label: "Preferences", icon: Building2 },
];

const validTabs: SettingsTab[] = [
  "profile",
  "notifications",
  "security",
  "preferences",
];

function PatientSettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabParam = searchParams.get("tab");
  const activeTab: SettingsTab = validTabs.includes(tabParam as SettingsTab)
    ? (tabParam as SettingsTab)
    : "profile";

  function setActiveTab(tab: SettingsTab) {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "profile") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    router.replace(`${pathname}?${params}`, { scroll: false });
  }

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
        <h1 className="text-2xl text-gray-900 dark:text-slate-100 mb-1">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex gap-6">
        <TabTitle
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex-1 min-w-0">
          {activeTab === "profile" && (
            <ProfilePanel userRole="patient" profile={profile} />
          )}
          {activeTab === "notifications" && (
            <NotificationsPanel userRole="patient" />
          )}
          {activeTab === "security" && <SecurityPanel />}
          {activeTab === "preferences" && <PreferencesPanel />}
        </div>
      </div>
    </div>
  );
}

export default function PatientSettingsRoute() {
  return (
    <Suspense fallback={null}>
      <PatientSettingsContent />
    </Suspense>
  );
}
