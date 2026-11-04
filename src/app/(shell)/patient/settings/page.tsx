import { Suspense } from "react";
import TapWrapper from "@/shared/components/settings/TapWrapper";
import { patientProfile } from "@/shared/types/type";

export default function SettingsRoute() {
  const profile = {
    firstName: "Ebrahem",
    lastName: "Ahmed",
    phone: "012726839212",
    date: "2026-07-10",
    blood: "+O",
    address: "address",
    role: "patient",
    gender: "Male",
    age: 20,
  };

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
        <TapWrapper profile={profile as patientProfile} />
      </Suspense>
    </div>
  );
}
