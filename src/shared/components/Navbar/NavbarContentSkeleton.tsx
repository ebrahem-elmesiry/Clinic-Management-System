"use client";

import { Skeleton } from "@/shared/components/ui/skeleton";

interface NavbarContentSkeletonProps {
  rows?: number;
}

export default function NavbarContentSkeleton({
  rows = 3,
}: NavbarContentSkeletonProps) {
  return (
    <div className="p-2">
      <Skeleton className="h-3 w-20 mx-2 mb-2" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-2 py-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
