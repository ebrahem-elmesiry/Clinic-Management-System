"use client";

import React from "react";
import ChangePassword from "@/shared/components/settings/ChangePassword";
import ResetPassword from "@/shared/components/settings/ResetPassword";
import TwoFactorAuth from "@/shared/components/settings/TwoFactorAuth";
import ActiveSessions from "@/shared/components/settings/ActiveSessions";
import LoginHistory from "@/shared/components/settings/LoginHistory";

export default function SecurityPanel() {
  return (
    <div className="space-y-6">
      <ChangePassword />
      <ResetPassword />
      <TwoFactorAuth />
      <ActiveSessions />
      <LoginHistory />
    </div>
  );
}
