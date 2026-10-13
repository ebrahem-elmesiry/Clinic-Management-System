import { UserX } from "lucide-react";

interface UnknownPatientProps {
  patientId?: string | null;
}

export default function UnknownPatient({ patientId }: UnknownPatientProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-8 text-center">
      <div className="w-12 h-12 bg-red-800/20 rounded-full flex items-center justify-center mx-auto mb-3">
        <UserX className="w-6 h-6 text-red-700 dark:text-red-700" />
      </div>
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
        Unknown patient
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No patient found {patientId ? `with ID "${patientId}"` : ""} — the link
        may be invalid or the patient was removed.
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        Please select a patient from the list.
      </p>
    </div>
  );
}
