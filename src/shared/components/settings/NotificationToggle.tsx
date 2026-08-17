"use client";

import React, { useState } from "react";

interface NotificationToggleProps {
  label: string;
  desc: string;
  defaultOn: boolean;
}

export default function NotificationToggle({
  label,
  desc,
  defaultOn,
}: NotificationToggleProps) {
  const [enabled, setEnabled] = useState(defaultOn);

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-slate-700/50 last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-sm text-gray-900 dark:text-slate-100">{label}</p>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
          enabled ? "bg-blue-600" : "bg-gray-200 dark:bg-slate-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
