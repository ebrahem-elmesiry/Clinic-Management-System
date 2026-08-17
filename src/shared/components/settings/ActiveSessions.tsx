"use client";

import React from "react";
import { Monitor, Smartphone } from "lucide-react";

const sessions = [
  {
    device: "Chrome on Windows",
    location: "New York, US",
    time: "Current session",
    icon: Monitor,
    current: true,
  },
  {
    device: "Safari on iPhone",
    location: "New York, US",
    time: "2 hours ago",
    icon: Smartphone,
    current: false,
  },
];

export default function ActiveSessions() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-4">Active Sessions</h2>
      <div className="space-y-3">
        {sessions.map((session, i) => {
          const Icon = session.icon;
          return (
            <div
              key={i}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    session.current ? "bg-blue-100 dark:bg-blue-900/30" : "bg-gray-100 dark:bg-slate-700"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      session.current ? "text-blue-600" : "text-gray-500 dark:text-slate-400"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-slate-100">{session.device}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {session.location} · {session.time}
                  </p>
                </div>
              </div>
              {session.current ? (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 text-xs rounded-full">
                  Current
                </span>
              ) : (
                <button className="text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded-lg">
                  Revoke
                </button>
              )}
            </div>
          );
        })}
      </div>
      <button className="mt-4 text-sm text-red-600 hover:text-red-700">
        Revoke all other sessions
      </button>
    </div>
  );
}
