"use client";

import NoPatientChoose from "@/role/admin/components/PatientRecords/NoPatientChoose";
import UnknownPatient from "@/role/admin/components/PatientRecords/UnknownPatient";
import { User, Calendar, Phone, Mail, MapPin, Activity } from "lucide-react";
import WrapperComponent from "../WrapperComponent";

interface PatientProfile {
  name: string;
  age: number;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  allergies: string;
  emergencyContact: string;
}

interface PatientInformationProps {
  patient: PatientProfile | undefined;
  isUnknown?: boolean;
  patientId?: string | null;
}

export default function PatientInformation({
  patient,
  isUnknown,
  patientId,
}: PatientInformationProps) {
  if (isUnknown) {
    return (
      <WrapperComponent title="Patient Information">
        <UnknownPatient patientId={patientId} />
      </WrapperComponent>
    );
  }

  return (
    <WrapperComponent title="Patient Information">
      {patient ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900 dark:text-gray-100 mb-1">
                  {patient.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {patient.age} years • {patient.gender} • {patient.bloodGroup}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Date of Birth
                </p>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  {patient.dob}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  {patient.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Address
                </p>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  {patient.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoPatientChoose />
      )}
    </WrapperComponent>
  );
}
