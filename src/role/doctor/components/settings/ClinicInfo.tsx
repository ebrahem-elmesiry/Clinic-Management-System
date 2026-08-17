"use client";

import React from "react";
import { Stethoscope, Clock } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function ClinicInfo() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-4">Clinic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="clinicName">Clinic Name</Label>
          <div className="relative mt-2">
            <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
            <Input
              id="clinicName"
              defaultValue="HealthCare Clinic"
              className="pl-9"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="consultFee">Consultation Fee ($)</Label>
          <Input
            id="consultFee"
            type="number"
            defaultValue="150"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="startTime">Working Hours Start</Label>
          <div className="relative mt-2">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
            <Input
              id="startTime"
              type="time"
              defaultValue="09:00"
              className="pl-9"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="endTime">Working Hours End</Label>
          <div className="relative mt-2">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
            <Input
              id="endTime"
              type="time"
              defaultValue="18:00"
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Label className="mb-3 block">Working Days</Label>
        <div className="flex flex-wrap gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <button
              key={day}
              className={`px-4 py-2 rounded-lg text-sm border-2 transition-all ${
                i < 6
                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                  : "border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
