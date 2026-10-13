"use client";

import { useState } from "react";
import { UserRole } from "../types/type";

export default function NotificationsPanelHook(userRole: UserRole) {
  const isAdmin = userRole === "admin";
  const isDoctor = userRole === "doctor";

  const notifications = [
    {
      key: "appointment_alerts",
      label: "Appointment Alerts",
      desc: isDoctor
        ? "Notifications about your patient's appointments"
        : "Notifications about your appointments",
      defaultOn: true,
    },
    ...(isAdmin
      ? [
          {
            key: "new_patient_registrations",
            label: "New Patient Registrations",
            desc: "Be notified when new patients register",
            defaultOn: true,
          },
        ]
      : []),
  ];

  const [values, setValues] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(notifications.map((n) => [n.key, n.defaultOn])),
  );

  function toggleValue(key: string) {
    setValues((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return { notifications, values, toggleValue };
}
