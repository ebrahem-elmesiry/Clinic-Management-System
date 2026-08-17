"use client";

import React from "react";
import { Moon, Sun, Monitor, Globe, Clock } from "lucide-react";
import { Label } from "@/shared/components/ui/label";

export default function AppearanceCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg text-gray-900 mb-6">Appearance</h2>

      <div className="mb-6">
        <Label className="mb-3 block">Theme</Label>
        <div className="flex gap-3">
          {[
            { id: "light", label: "Light", icon: Sun },
            { id: "dark", label: "Dark", icon: Moon },
            { id: "system", label: "System", icon: Monitor },
          ].map((theme) => {
            const Icon = theme.icon;
            return (
              <button
                key={theme.id}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  theme.id === "light"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    theme.id === "light"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-sm ${
                    theme.id === "light"
                      ? "text-blue-700"
                      : "text-gray-600"
                  }`}
                >
                  {theme.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <Label className="mb-3 block">Language</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select className="w-full max-w-xs pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white">
            <option value="en">English (US)</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Timezone</Label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select className="w-full max-w-xs pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white">
            <option>Eastern Time (ET) — UTC-5</option>
            <option>Central Time (CT) — UTC-6</option>
            <option>Pacific Time (PT) — UTC-8</option>
            <option>UTC</option>
          </select>
        </div>
      </div>
    </div>
  );
}
