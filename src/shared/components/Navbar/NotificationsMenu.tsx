"use client";

import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

const notifications = [
  {
    id: 1,
    text: "New appointment scheduled",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    text: "Patient John Doe checked in",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    text: "Lab results ready for review",
    time: "1 hour ago",
    unread: false,
  },
];

export default function NotificationsMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-900 dark:text-gray-100">Notifications</h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${
                notif.unread ? "bg-blue-50 dark:bg-blue-900/20" : ""
              }`}
            >
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {notif.text}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {notif.time}
              </p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
