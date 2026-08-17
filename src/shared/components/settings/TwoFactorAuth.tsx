"use client";

import React from "react";
import { Shield } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function TwoFactorAuth() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg text-gray-900 mb-1">
            Two-Factor Authentication
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Add an extra layer of security to your account.
          </p>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
              Not Enabled
            </span>
          </div>
        </div>
        <Shield className="w-8 h-8 text-gray-300 mt-1" />
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700">Enable 2FA</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </div>
  );
}
