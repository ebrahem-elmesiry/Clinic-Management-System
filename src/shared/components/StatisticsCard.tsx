"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatisticsCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  color: "blue" | "teal" | "green" | "purple";
}

export default function StatisticsCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: StatisticsCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    teal: "from-teal-500 to-teal-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <p className="text-3xl text-gray-900 mb-1">{value}</p>
          {change && <p className="text-xs text-gray-500">{change}</p>}
        </div>
        <div
          className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
