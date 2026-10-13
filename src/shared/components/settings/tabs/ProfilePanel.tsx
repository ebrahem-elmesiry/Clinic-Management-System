"use client";

import AvatarUpload from "@/shared/components/settings/Profile/AvatarUpload";
import ProfileInputs from "@/shared/components/settings/Profile/ProfileInputs";
import { Profile } from "@/shared/types/type";

interface ProfilePanelProps {
  profile: Profile;
}

export default function ProfilePanel({ profile }: ProfilePanelProps) {
  const fullName = { firstName: profile.firstName, lastName: profile.lastName };
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-6">
          Profile Information
        </h2>
        <AvatarUpload userName={fullName} userRole={profile.role} />
        <ProfileInputs profile={profile} userRole={profile.role} />
      </div>
    </div>
  );
}
