"use client";

import { Globe, Clock } from "lucide-react";
import { Label } from "@/shared/components/ui/label";
import { useTheme } from "next-themes";
import { themes } from "@/shared/constants/constants";
import { useEffect, useState } from "react";

export default function AppearanceCard() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-6">
        Appearance
      </h2>

      <div className="mb-6">
        <Label className="mb-3 block">Theme</Label>
        <div className="flex gap-3">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            return (
              <button
                key={themeOption.id}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all 
                  ${
                    themeOption.id === theme
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-600"
                      : "border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 dark:bg-slate-700/50"
                  }`}
                onClick={() => setTheme(themeOption.id)}
              >
                <Icon
                  className={`w-6 h-6 ${
                    themeOption.id === theme
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-slate-400"
                  }`}
                />
                <span
                  className={`text-sm ${
                    themeOption.id === theme
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-slate-400"
                  }`}
                >
                  {themeOption.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Label className="mb-3 block">Language</Label>
      <div className="relative">
        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
        <select className="w-full max-w-xs pl-9 pr-4 py-2 border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white">
          <option value="en">English (US)</option>
          <option value="ar">Arabic</option>
        </select>
      </div>
    </div>
  );
}
