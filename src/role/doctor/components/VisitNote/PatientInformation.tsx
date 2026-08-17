"use client";

import React from "react";
import { Search, User } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function PatientInformation() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-4">Patient Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="patient">Select Patient</Label>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
            <Input
              id="patient"
              placeholder="Search patient by name or ID..."
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            className="mt-2"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-900 dark:text-slate-100">John Smith</p>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Age: 45 • Male • Blood Group: O+
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
