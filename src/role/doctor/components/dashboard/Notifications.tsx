"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface Notification {
  type: 'info' | 'warning' | 'success';
  message: string;
  time: string;
}

interface NotificationsProps {
  notifications: Notification[];
}

export default function Notifications({ notifications }: NotificationsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg text-gray-900">Notifications</h2>
      </div>
      <div className="p-6 space-y-4">
        {notifications.map((notif, index) => (
          <div key={index} className="flex gap-3">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${notif.type === 'info' ? 'bg-blue-100'
                  : notif.type === 'warning' ? 'bg-orange-100'
                  : 'bg-green-100'}
              `}
            >
              <AlertCircle
                className={`
                  w-4 h-4
                  ${notif.type === 'info' ? 'text-blue-600'
                    : notif.type === 'warning' ? 'text-orange-600'
                    : 'text-green-600'}
                `}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{notif.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
