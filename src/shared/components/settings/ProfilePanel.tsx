"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button";
import AvatarUpload from "@/shared/components/settings/Profile/AvatarUpload";
import ProfileInputs from "@/shared/components/settings/Profile/ProfileInputs";
import ClinicInfo from "@/role/doctor/components/settings/ClinicInfo";

interface Profile {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  license: string;
  bio: string;
}

interface ProfilePanelProps {
  userRole: "doctor" | "admin" | "patient";
  profile: Profile;
  onSave: () => void;
}

export default function ProfilePanel({
  userRole,
  profile,
  onSave,
}: ProfilePanelProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg text-gray-900 mb-6">Profile Information</h2>
        <AvatarUpload name={profile.name} userRole={userRole} />
        <ProfileInputs profile={profile} userRole={userRole} />
      </div>

      {userRole === "doctor" && <ClinicInfo />}

      <div className="flex justify-end">
        <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 px-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
