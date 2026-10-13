"use client";

import { Button } from "@/shared/components/ui/button";
import NotificationToggle from "@/shared/components/settings/tabs/Notifications/NotificationToggle";
import NotificationsPanelHook from "@/shared/hooks/NotificationsPanelHook";
import { toast } from "sonner";
import { UserRole } from "@/shared/types/type";

interface NotificationsPanelProps {
  userRole: UserRole;
}

export default function NotificationsPanel({
  userRole,
}: NotificationsPanelProps) {
  const { notifications, values, toggleValue } =
    NotificationsPanelHook(userRole);

  function handleSave() {
    // Send Key of notification with value and
    toast.success("Settings saved successfully.");
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-2">
          In-App Notifications
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
          Control what appears in your notification bell.
        </p>
        <div className="space-y-4">
          {notifications.map((item) => (
            <NotificationToggle
              {...item}
              key={item.key}
              enabled={values[item.key]}
              onToggle={() => toggleValue(item.key)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
}
