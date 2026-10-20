import { Suspense } from "react";
import TapWrapper from "./TapWrapper";
import { Profile } from "@/shared/types/type";

export default function SettingsPageWrapper({ profile }: { profile: Profile }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-slate-100 mb-1">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>
      <Suspense fallback={null}>
        <TapWrapper profile={profile} />
      </Suspense>
    </div>
  );
}
