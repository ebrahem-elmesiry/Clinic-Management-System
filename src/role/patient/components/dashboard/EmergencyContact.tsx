"use client";

import React from "react";
import { Bell } from "lucide-react";

interface EmergencyContactProps {
  emergencyContact: string;
}

export default function EmergencyContact({
  emergencyContact,
}: EmergencyContactProps) {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800/50 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <Bell className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h3 className="text-gray-900 dark:text-slate-100">Emergency Contact</h3>
          <p className="text-sm text-gray-600 dark:text-slate-300">{emergencyContact}</p>
        </div>
      </div>
      <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        Emergency Call
      </button>
    </div>
  );
}
