"use client";

import React, { useState } from "react";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-2">Reset Password</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
        Set a new password if you've forgotten your current one.
      </p>
      <div className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="resetNewPwd">New Password</Label>
          <div className="relative mt-2">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
            <input
              id="resetNewPwd"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full pl-9 pr-10 py-2 border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
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
                    i < 3 ? c : "bg-gray-200 dark:bg-slate-700"
                  }`}
                />
              )
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Password strength: Medium</p>
        </div>

        <div>
          <Label htmlFor="resetConfirmPwd">Confirm New Password</Label>
          <div className="relative mt-2">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
            <input
              id="resetConfirmPwd"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full pl-9 pr-10 py-2 border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
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
          <Button>
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
}
