"use client";

import TabTitle, { type SettingsTab } from "./TabTitle";
import ProfilePanel from "./tabs/ProfilePanel";
import NotificationsPanel from "./tabs/Notifications/NotificationsPanel";
import PreferencesPanel from "./tabs/PreferencesPanel";
import ClinicInfo from "@/role/admin/components/settings/ClinicInfo";
import DoctorFees from "@/role/admin/components/settings/DoctorFees";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { tabs } from "@/shared/constants/constants";
import SecurityPanel from "./tabs/SecurityPanel";
import { Profile } from "@/shared/types/type";

interface TapWrapperProps {
  profile: Profile;
}

export default function TapWrapper({ profile }: TapWrapperProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = (searchParams.get("tab") || "profile") as SettingsTab;

  const pathname = usePathname();
  function setActiveTab(tab: SettingsTab) {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "profile") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    router.replace(`${pathname}?${params}`, { scroll: false });
  }
  return (
    <div className="flex flex-col gap-6">
      <TabTitle tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 min-w-0">
        {activeTab === "profile" && <ProfilePanel profile={profile} />}
        {activeTab === "notifications" && (
          <NotificationsPanel userRole={profile.role} />
        )}
        {activeTab === "security" && <SecurityPanel />}
        {activeTab === "preferences" && <PreferencesPanel />}
        {activeTab === "clinic" && <ClinicInfo />}
        {activeTab === "doctor-fees" && <DoctorFees />}
      </div>
    </div>
  );
}
