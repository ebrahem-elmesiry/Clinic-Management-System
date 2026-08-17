"use client";

import { User, Calendar, Phone, Mail, MapPin, Activity } from "lucide-react";

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
  patient: PatientProfile;
}

export default function PatientInformation({
  patient,
}: PatientInformationProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl text-gray-900 mb-1">{patient.name}</h2>
            <p className="text-gray-600">
              {patient.age} years • {patient.gender} • {patient.bloodGroup}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Date of Birth</p>
            <p className="text-sm text-gray-900">{patient.dob}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Phone className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-sm text-gray-900">{patient.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm text-gray-900">{patient.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg md:col-span-2">
          <MapPin className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm text-gray-900">{patient.address}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
          <Activity className="w-5 h-5 text-red-400" />
          <div>
            <p className="text-xs text-red-600">Allergies</p>
            <p className="text-sm text-gray-900">{patient.allergies}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
