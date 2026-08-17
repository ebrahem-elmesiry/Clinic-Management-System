"use client";

import React from "react";

export default function DoctorNotes() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-4">Doctor's Notes</h2>
      <textarea
        rows={4}
        placeholder="Diagnosis, advice, precautions, or other clinical notes..."
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
    </div>
  );
}
