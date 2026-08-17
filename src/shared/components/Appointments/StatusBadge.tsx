"use client";

import React from "react";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const classes: Record<string, string> = {
    confirmed: "bg-green-100 text-green-700",
    pending: "bg-orange-100 text-orange-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs ${classes[status] ?? "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}
