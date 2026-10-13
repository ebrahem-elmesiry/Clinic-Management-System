"use client";

import React from "react";

export type SettingsTab =
  | "profile"
  | "notifications"
  | "security"
  | "preferences"
  | "clinic"
  | "doctor-fees";

export interface SettingsTabItem {
  id: SettingsTab;
  label: string;
  icon: React.ElementType;
  admin?: boolean;
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
  const isAdmin = true;
  return (
    <div className="w-52 shrink-0">
      <nav className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-2 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const hideAdminTab = tab.admin && !isAdmin;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left 
                ${hideAdminTab ? "hidden" : ""}
                ${
                  activeTab === tab.id
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text--700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
