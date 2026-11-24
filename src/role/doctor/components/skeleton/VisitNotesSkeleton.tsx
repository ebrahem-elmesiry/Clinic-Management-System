import React from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";

function SectionSkeleton({
  showButton = false,
  children,
}: {
  showButton?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3.5 w-56" />
        </div>
        {showButton && <Skeleton className="h-8 w-28 rounded-md" />}
      </div>
      {children}
    </div>
  );
}

export default function VisitNotesSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-md max-w-full" />
      </div>

      <div className="lg:col-span-2 space-y-6">
        <SectionSkeleton>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3.5 w-48" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3.5 w-28" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3.5 w-24" />
              </div>
            </div>
          </div>
        </SectionSkeleton>

        <SectionSkeleton showButton>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-700">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-56" />
            </div>
            <Skeleton className="h-8 w-28 rounded-md" />
          </div>
        </SectionSkeleton>

        <SectionSkeleton showButton>
          <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg space-y-3">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="w-4 h-4 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2 space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Skeleton className="h-3 w-36" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </SectionSkeleton>

        <SectionSkeleton>
          <Skeleton className="h-19 w-full rounded-lg" />
        </SectionSkeleton>

        <SectionSkeleton>
          <Skeleton className="h-23 w-full rounded-lg" />
        </SectionSkeleton>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-3.5 w-56" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-14 rounded-lg" />
              <Skeleton className="h-8 w-14 rounded-lg" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Skeleton className="w-3.5 h-3.5" />
            <Skeleton className="h-3.5 w-40" />
          </div>
        </div>

        <div className="flex gap-3">
          <Skeleton className="flex-1 h-9" />
          <Skeleton className="flex-1 h-9" />
        </div>
      </div>
    </div>
  );
}
