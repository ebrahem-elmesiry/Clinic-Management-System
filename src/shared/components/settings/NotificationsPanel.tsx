"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button";
import NotificationToggle from "@/shared/components/settings/NotificationToggle";

interface NotificationsPanelProps {
  userRole: "doctor" | "admin" | "patient";
  onSave: () => void;
}

export default function NotificationsPanel({
  userRole,
  onSave,
}: NotificationsPanelProps) {
  const isPatient = userRole === "patient";

  const emailNotifications = [
    { label: "Appointment Reminders", desc: "Get notified 24 hours before your appointments", defaultOn: true },
    { label: "Appointment Confirmations", desc: "Receive confirmation when appointments are booked", defaultOn: true },
    { label: "Appointment Cancellations", desc: "Get notified when appointments are cancelled", defaultOn: true },
    ...(isPatient
      ? [
          { label: "Prescription Ready", desc: "Get notified when your prescription is ready", defaultOn: true },
          { label: "Bill Generated", desc: "Receive notification when a new invoice is created", defaultOn: true },
        ]
      : [
          { label: "New Patient Registrations", desc: "Be notified when new patients register", defaultOn: false },
          { label: "Lab Results Available", desc: "Alert when lab results are ready for review", defaultOn: true },
        ]),
    { label: "Weekly Summary", desc: "A weekly digest of your activity", defaultOn: false },
    { label: "System Updates", desc: "Important announcements and system changes", defaultOn: true },
  ];

  const inAppNotifications = [
    { label: "Appointment Alerts", desc: "Pop-up reminders for upcoming appointments", defaultOn: true },
    { label: "Messages", desc: "New messages from doctors or clinic staff", defaultOn: true },
    ...(isPatient
      ? [{ label: "Payment Due", desc: "Reminders for pending payments", defaultOn: true }]
      : [
          { label: "Patient Check-ins", desc: "Alert when a patient checks in", defaultOn: true },
          { label: "Urgent Flags", desc: "High-priority alerts for critical updates", defaultOn: true },
        ]),
    { label: "Sounds", desc: "Play a sound for new notifications", defaultOn: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-2">Email Notifications</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
          Choose which emails you want to receive.
        </p>
        <div className="space-y-4">
          {emailNotifications.map((item, index) => (
            <NotificationToggle key={index} {...item} />
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-2">In-App Notifications</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
          Control what appears in your notification bell.
        </p>
        <div className="space-y-4">
          {inAppNotifications.map((item, index) => (
            <NotificationToggle key={index} {...item} />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onSave}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
