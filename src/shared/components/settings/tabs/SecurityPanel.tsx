"use client";

import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import SecurityPanelHook from "@/role/admin/hooks/SecurityPanelHook";
import { Input } from "../../ui/input";

export default function SecurityPanel() {
  const { show, passwords, setPassword, toggleShow, handleSubmit } =
    SecurityPanelHook();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-6">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="currentPwd">Current Password</Label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />

            <Input
              id="currentPwd"
              type={show.current ? "text" : "password"}
              placeholder="Enter current password"
              className="w-full pl-9 pr-10 py-2 border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={passwords.currentPassword}
              onChange={(e) => setPassword("currentPassword", e.target.value)}
            />

            <button
              type="button"
              onClick={() => toggleShow("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
            >
              {show.current ? (
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
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />

            <Input
              id="newPwd"
              type={show.new ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full pl-9 pr-10 py-2 border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={passwords.newPassword}
              onChange={(e) => setPassword("newPassword", e.target.value)}
            />

            <button
              type="button"
              onClick={() => toggleShow("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
            >
              {show.new ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPwd">Confirm New Password</Label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />

            <Input
              id="confirmPwd"
              type={show.confirm ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full pl-9 pr-10 py-2 border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={passwords.confirmPassword}
              onChange={(e) => setPassword("confirmPassword", e.target.value)}
            />

            <button
              type="button"
              onClick={() => toggleShow("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
            >
              {show.confirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">
            Password must be at least 8 characters, include one uppercase
            letter, one number, and one special character.
          </p>

          <div className="flex justify-end">
            <Button type="submit">Update Password</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
