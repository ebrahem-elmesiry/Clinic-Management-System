"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg text-gray-900 mb-6">Change Password</h2>
      <div className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="currentPwd">Current Password</Label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="currentPwd"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              className="w-full pl-9 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="newPwd">New Password</Label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="newPwd"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full pl-9 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="mt-2 flex gap-1">
            {["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"].map(
              (c, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i < 2 ? c : "bg-gray-200"
                  }`}
                />
              )
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Password strength: Weak</p>
        </div>

        <div>
          <Label htmlFor="confirmPwd">Confirm New Password</Label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="confirmPwd"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full pl-9 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs text-gray-500 mb-3">
            Password must be at least 8 characters, include one uppercase
            letter, one number, and one special character.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
}
