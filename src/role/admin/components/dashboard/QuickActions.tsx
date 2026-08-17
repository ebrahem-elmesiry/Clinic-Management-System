"use client";

import { LucideIcon } from "lucide-react";

interface QuickAction {
  label: string;
  icon: LucideIcon;
  color: "blue" | "teal" | "purple" | "green";
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const actionColorClass = {
  blue: "from-blue-500 to-blue-600",
  teal: "from-teal-500 to-teal-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
};

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${actionColorClass[action.color]} rounded-lg flex items-center justify-center mb-3`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-900 group-hover:text-blue-600">
                {action.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
