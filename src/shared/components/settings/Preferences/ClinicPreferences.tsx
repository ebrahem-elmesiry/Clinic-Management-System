"use client";

import React from "react";
import { Label } from "@/shared/components/ui/label";
import NotificationToggle from "@/shared/components/settings/NotificationToggle";

interface ClinicPreferencesProps {
  role: "admin" | "doctor";
}

export default function ClinicPreferences({ role }: ClinicPreferencesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg text-gray-900 mb-6">
        {role === "admin" ? "Clinic Preferences" : "Appointment Preferences"}
      </h2>

      <div className="space-y-5">
        <div>
          <Label htmlFor="appointmentDuration">
            Default Appointment Duration (minutes)
          </Label>
          <select
            id="appointmentDuration"
            className="w-full max-w-xs mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="15">15 minutes</option>
            <option value="30" selected>
              30 minutes
            </option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>

        <div>
          <Label htmlFor="bufferTime">Buffer Time Between Appointments</Label>
          <select
            id="bufferTime"
            className="w-full max-w-xs mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="0">No buffer</option>
            <option value="5">5 minutes</option>
            <option value="10" selected>
              10 minutes
            </option>
            <option value="15">15 minutes</option>
          </select>
        </div>

        <div className="space-y-3 pt-2">
          {[
            {
              label: "Auto-confirm appointments",
              desc: "Automatically confirm new appointment requests",
              defaultOn: false,
            },
            {
              label: "Allow online booking",
              desc: "Let patients book appointments through the portal",
              defaultOn: true,
            },
            {
              label: "Send reminder SMS",
              desc: "Send SMS reminders 24 hours before appointments",
              defaultOn: true,
            },
            ...(role === "admin"
              ? [
                  {
                    label: "Show revenue to doctors",
                    desc: "Allow doctors to see revenue statistics",
                    defaultOn: false,
                  },
                ]
              : []),
          ].map((pref, i) => (
            <NotificationToggle key={i} {...pref} />
          ))}
        </div>
      </div>
    </div>
  );
}
