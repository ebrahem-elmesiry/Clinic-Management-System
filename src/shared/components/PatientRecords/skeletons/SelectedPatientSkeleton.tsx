"use client";

import PatientSearchResultsSkeleton from "./PatientSearchResultsSkeleton";

export default function SelectedPatientSkeleton() {
  return (
    <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
      <div className="overflow-hidden">
        <PatientSearchResultsSkeleton />
      </div>
    </div>
  );
}
