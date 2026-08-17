"use client";

import React from "react";
import { CalendarClock } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

const FOLLOW_UP_OPTIONS = [
  { label: "1 week", days: 7 },
  { label: "2 weeks", days: 14 },
  { label: "1 month", days: 30 },
  { label: "3 months", days: 90 },
];

export default function FollowUp() {
  const [followUp, setFollowUp] = React.useState<"yes" | "no">("no");
  const [followUpDate, setFollowUpDate] = React.useState("");

  const applyFollowUpDays = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setFollowUpDate(d.toISOString().split("T")[0]);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg text-gray-900 dark:text-slate-100">Follow-up</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Does the patient need to come back?
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFollowUp("yes")}
            className={`px-3 py-1.5 text-sm border rounded-lg ${followUp === "yes" ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"}`}
          >
            Yes
          </button>
          <button
            onClick={() => setFollowUp("no")}
            className={`px-3 py-1.5 text-sm border rounded-lg ${followUp === "no" ? "bg-gray-800 text-white border-gray-800" : "border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"}`}
          >
            No
          </button>
        </div>
      </div>

      {followUp === "yes" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {FOLLOW_UP_OPTIONS.map((opt) => (
              <button
                key={opt.days}
                onClick={() => applyFollowUpDays(opt.days)}
                className="px-3 py-1.5 text-sm border border-gray-200 dark:border-slate-700 rounded-lg hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div>
            <Label htmlFor="follow-up-date">Follow-up date</Label>
            <Input
              id="follow-up-date"
              type="date"
              className="mt-2 max-w-xs"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1">
            <CalendarClock className="w-3.5 h-3.5" />
            Follow-up scheduled for{" "}
            {followUpDate
              ? new Date(followUpDate).toLocaleDateString()
              : "—"}
          </p>
        </div>
      )}
    </div>
  );
}
