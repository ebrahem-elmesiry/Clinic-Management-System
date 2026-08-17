"use client";

import React from "react";
import { Trash2 } from "lucide-react";

export default function DangerZone() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
      <h2 className="text-lg text-red-700 mb-2">Danger Zone</h2>
      <p className="text-sm text-gray-500 mb-4">
        These actions are permanent and cannot be undone.
      </p>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm text-red-800">Delete Account</p>
              <p className="text-xs text-red-600">
                Permanently remove your account and all data
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
