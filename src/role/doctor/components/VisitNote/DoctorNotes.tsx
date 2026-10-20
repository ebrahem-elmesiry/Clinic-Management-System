"use client";

import WrapperComponent from "@/shared/components/WrapperComponent";

interface DoctorNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DoctorNotes({ value, onChange }: DoctorNotesProps) {
  return (
    <WrapperComponent title="Doctor's Notes">
      <textarea
        rows={4}
        placeholder="Diagnosis, advice, precautions, or other clinical notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
    </WrapperComponent>
  );
}
