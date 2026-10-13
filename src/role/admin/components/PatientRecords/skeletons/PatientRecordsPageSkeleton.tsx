"use client";

import SelectedPatientSkeleton from "./SelectedPatientSkeleton";
import PatientInformationSkeleton from "./PatientInformationSkeleton";
import TabsSkeleton from "./TabsSkeleton";

interface PatientRecordsPageSkeletonProps {
  tab?: "visit-history" | "vitals" | "prescriptions";
}

export default function PatientRecordsPageSkeleton({ tab = "visit-history" }: PatientRecordsPageSkeletonProps) {
  return (
    <div className="p-8 space-y-6">
      {/* Page title skeleton */}
      <div className="flex items-start justify-between animate-pulse">
        <div className="space-y-2">
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-40" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64" />
        </div>
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SelectedPatientSkeleton />

        <div className="lg:col-span-3 space-y-6">
          <PatientInformationSkeleton />

          {/* Tabs header skeleton */}
          <div className="flex gap-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-1 w-fit animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-28" />
          </div>

          <TabsSkeleton variant={tab} />
        </div>
      </div>
    </div>
  );
}
