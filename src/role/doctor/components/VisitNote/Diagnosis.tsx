"use client";

import { Label } from "@/shared/components/ui/label";

interface DiagnosisProps {
  onChange?: (value: string) => void;
}

export default function Diagnosis({ onChange }: DiagnosisProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-lg text-gray-900 dark:text-slate-100">Diagnosis</h2>
      </div>

      <div>
        <Label htmlFor="diagnosis" className="sr-only">
          Diagnosis
        </Label>
        <textarea
          id="diagnosis"
          rows={3}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Write Diagnosis Here"
          className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}
