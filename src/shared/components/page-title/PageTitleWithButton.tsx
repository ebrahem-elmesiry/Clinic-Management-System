"use client";

import React from "react";

interface PageTitleWithButtonProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageTitleWithButton({
  title,
  subtitle,
  action,
}: PageTitleWithButtonProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-3">{action}</div>}
    </div>
  );
}
