"use client";

import WrapperComponent from "@/shared/components/WrapperComponent";

interface DiagnosisProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Diagnosis({ value, onChange }: DiagnosisProps) {
  return (
    <WrapperComponent title="Diagnosis">
      <textarea
        id="diagnosis"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write Diagnosis Here"
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
    </WrapperComponent>
  );
}
