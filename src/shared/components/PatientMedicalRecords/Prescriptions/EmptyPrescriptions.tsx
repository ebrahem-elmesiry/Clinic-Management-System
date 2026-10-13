import { Pill } from "lucide-react";

export default function EmptyPrescriptions() {
  return (
    <div className="space-y-4">
      <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center bg-gray-50 dark:bg-gray-800/50">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto mb-3">
          <Pill className="w-5 h-5 text-blue-600 dark:text-blue-300" />
        </div>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          No active prescriptions
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          This patient has no prescriptions yet. Click &quot;Add
          Prescription&quot; to create one.
        </p>
      </div>
    </div>
  );
}
