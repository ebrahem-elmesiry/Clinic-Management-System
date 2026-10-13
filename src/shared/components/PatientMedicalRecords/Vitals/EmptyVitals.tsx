import { Activity } from "lucide-react";

export default function EmptyVitals({ doctor }: { doctor: boolean }) {
  return (
    <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-800/50">
      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto mb-4">
        <Activity className="w-6 h-6 text-blue-600 dark:text-blue-300" />
      </div>
      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        No vitals recorded
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
        No vitals have been recorded for this patient yet. Click{" "}
        {doctor ? '"Add/Edit Vitals"' : "Record Vitals"} to add the first
        measurement.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-gray-400 dark:text-gray-500">
        <span>Blood Pressure: —</span>
        <span>•</span>
        <span>Heart Rate: —</span>
        <span>•</span>
        <span>Temperature: —</span>
      </div>
    </div>
  );
}
