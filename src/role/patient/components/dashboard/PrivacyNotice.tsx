"use client";

import React from "react";

interface PrivacyNoticeProps {
  patientId: string;
}

export default function PrivacyNotice({ patientId }: PrivacyNoticeProps) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg p-4 flex items-start gap-3">
      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-white text-xs">🔒</span>
      </div>
      <div>
        <p className="text-sm text-gray-900 dark:text-slate-100 mb-1">Your Privacy is Protected</p>
        <p className="text-xs text-gray-600 dark:text-slate-300">
          This dashboard shows only YOUR personal medical information. Your data
          is encrypted and secured. Patient ID: {patientId.slice(-8)}
        </p>
      </div>
    </div>
  );
}
