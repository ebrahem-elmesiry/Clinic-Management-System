import { User } from "lucide-react";
import WrapperComponent from "@/shared/components/WrapperComponent";

interface PatientInformationProps {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  reason: string;
  appointmentType: "Regular" | "Follow-up";
}

export default function PatientInformation({
  name,
  age,
  gender,
  bloodGroup,
  reason,
  appointmentType,
}: PatientInformationProps) {
  return (
    <WrapperComponent title="Patient Information">
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-900 dark:text-slate-100">{name}</p>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Age: {age} • {gender} • Blood Group: {bloodGroup}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400">Reason</p>
            <p className="text-sm text-gray-900 dark:text-slate-100">
              {reason}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Appointment Type
            </p>
            <p className="text-sm text-gray-900 dark:text-slate-100">
              {appointmentType}
            </p>
          </div>
        </div>
      </div>
    </WrapperComponent>
  );
}
