import { User, Activity, Heart, Phone, MapPin } from "lucide-react";

interface PatientProfile {
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  dob: string;
}

interface PatientInformationProps {
  patient: PatientProfile;
}

export default function PatientInformation({
  patient,
}: PatientInformationProps) {
  const patientInfo = [
    {
      icon: User,
      title: "Age",
      value: `${patient.age} years`,
      color: "text-blue-600",
    },
    {
      icon: Activity,
      title: "Gender",
      value: patient.gender,
      color: "text-blue-600",
    },
    {
      icon: Heart,
      title: "Blood Group",
      value: patient.bloodGroup,
      color: "text-red-600",
    },
    {
      icon: Phone,
      title: "Phone",
      value: patient.phone,
      color: "text-green-600",
    },
    {
      icon: MapPin,
      title: "Date of Birth",
      value: patient.dob,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 dark:bg-slate-800 dark:border-slate-700 p-6">
      <h2 className="text-xl text-gray-900 dark:text-slate-100 mb-6">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patientInfo.map(({ icon: Icon, title, value, color }) => (
          <div
            key={title}
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
          >
            <Icon className={`w-5 h-5 ${color}`} />
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {title}
              </p>
              <p className="text-gray-900 dark:text-slate-100">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
