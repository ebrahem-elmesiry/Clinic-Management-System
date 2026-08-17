"use client";

import React from "react";
import { Download, AlertTriangle } from "lucide-react";

export default function DataPrivacy() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg text-gray-900 mb-4">Data & Privacy</h2>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <p className="text-sm text-gray-900">Download My Data</p>
              <p className="text-xs text-gray-500">
                Export all your data as a ZIP file
              </p>
            </div>
          </div>
          <span className="text-xs text-blue-600">Request</span>
        </button>
        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <div className="text-left">
              <p className="text-sm text-gray-900">Privacy Settings</p>
              <p className="text-xs text-gray-500">
                Control who can see your profile
              </p>
            </div>
          </div>
          <span className="text-xs text-blue-600">Manage</span>
        </button>
      </div>
    </div>
  );
}
