"use client";

import React from "react";

const loginActivity = [
  { event: "Successful login", device: "Chrome · Windows", time: "Today, 9:14 AM", success: true },
  { event: "Successful login", device: "Safari · iPhone", time: "Yesterday, 6:32 PM", success: true },
  { event: "Failed login attempt", device: "Firefox · Unknown", time: "Dec 22, 11:03 PM", success: false },
  { event: "Successful login", device: "Chrome · Windows", time: "Dec 21, 8:55 AM", success: true },
];

export default function LoginHistory() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg text-gray-900 mb-4">Recent Login Activity</h2>
      <div className="space-y-2">
        {loginActivity.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  item.success ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <div>
                <p className="text-sm text-gray-900">{item.event}</p>
                <p className="text-xs text-gray-500">{item.device}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
