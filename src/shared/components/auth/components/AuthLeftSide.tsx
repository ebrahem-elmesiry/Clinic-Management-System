"use client";

import { Stethoscope } from "lucide-react";

export default function AuthLeftSide() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-800 via-blue-700 to-teal-700 p-12 flex-col justify-between">
      <div className="flex items-center gap-3 text-white">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <Stethoscope className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl text-white">HealthCare</h1>
          <p className="text-sm text-blue-200">Clinic Management System</p>
        </div>
      </div>

      <div className="space-y-6 text-white">
        <h2 className="text-4xl">Modern Healthcare Management Solution</h2>
        <p className="text-lg text-blue-200">
          Streamline your clinic operations with our comprehensive management
          system. Manage appointments, patient records, prescriptions, and
          billing all in one place.
        </p>

        <div className="grid grid-cols-2 gap-4 pt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-3xl mb-1">500+</p>
            <p className="text-sm text-blue-200">Clinics</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-3xl mb-1">50K+</p>
            <p className="text-sm text-blue-200">Patients</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-3xl mb-1">1K+</p>
            <p className="text-sm text-blue-200">Doctors</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-3xl mb-1">99.9%</p>
            <p className="text-sm text-blue-200">Uptime</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-blue-200">
        © 2024 HealthCare. All rights reserved.
      </p>
    </div>
  );
}
