"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva("px-3 py-1 rounded-full text-xs font-medium", {
  variants: {
    status: {
      confirmed:
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
      active:
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
      completed:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      "in-progress":
        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      pending:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
      cancelled: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
      inactive: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
      doctor:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      admin:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
      patient:
        "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
      normal:
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
      abnormal: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
      mild: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
      moderate:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
      severe: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
      // added by me
      upcoming:
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({
  status,
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={cn(statusBadgeVariants({ status: status as any }), className)}
      {...props}
    >
      {status}
    </span>
  );
}
