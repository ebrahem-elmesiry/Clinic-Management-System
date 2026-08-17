"use client";

import React from "react";

export type SettingsTab = "profile" | "notifications" | "security" | "preferences";

export interface SettingsTabItem {
  id: SettingsTab;
  label: string;
  icon: React.ElementType;
}

interface TabTitleProps {
  tabs: SettingsTabItem[];
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export default function TabTitle({
  tabs,
  activeTab,
  onTabChange,
}: TabTitleProps) {
  return (
    <div className="w-52 flex-shrink-0">
      <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
