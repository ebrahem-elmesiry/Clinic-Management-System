"use client";

import React from "react";
import {
  User,
  Activity,
  Heart,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

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

export default function PatientInformation({ patient }: PatientInformationProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 dark:bg-slate-800 dark:border-slate-700 p-6">
      <h2 className="text-xl text-gray-900 dark:text-slate-100 mb-6">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
          <User className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">Age</p>
            <p className="text-gray-900 dark:text-slate-100">{patient.age} years</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
          <Activity className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">Gender</p>
            <p className="text-gray-900 dark:text-slate-100">{patient.gender}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
          <Heart className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">Blood Group</p>
            <p className="text-gray-900 dark:text-slate-100">{patient.bloodGroup}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
          <Phone className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">Phone</p>
            <p className="text-gray-900 dark:text-slate-100">{patient.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
          <Mail className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">Email</p>
            <p className="text-gray-900 dark:text-slate-100">{patient.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
          <MapPin className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">Date of Birth</p>
            <p className="text-gray-900 dark:text-slate-100">{patient.dob}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
