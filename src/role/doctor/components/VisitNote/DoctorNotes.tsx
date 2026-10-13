"use client";

import React from "react";
import WrapperComponent from "@/shared/components/WrapperComponent";

export default function DoctorNotes() {
  return (
    <WrapperComponent title="Doctor's Notes">
      <textarea
        rows={4}
        placeholder="Diagnosis, advice, precautions, or other clinical notes..."
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
    </WrapperComponent>
  );
}
