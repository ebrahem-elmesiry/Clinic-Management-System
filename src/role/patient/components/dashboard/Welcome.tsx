"use client";

import React from "react";
import { User } from "lucide-react";

interface HealthStats {
  upcomingAppointments: number;
  activePrescriptions: number;
  medicalConditions: number;
  lastVisit: string;
}

interface WelcomeProps {
  patientName: string;
  stats: HealthStats;
}

export default function Welcome({ patientName, stats }: WelcomeProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-3xl text-white mb-2">Welcome back, {patientName}</h1>
          <p className="text-blue-100">Here's your personal health dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-2xl text-white mb-1">{stats.upcomingAppointments}</p>
          <p className="text-sm text-blue-100">Upcoming Appointments</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-2xl text-white mb-1">{stats.activePrescriptions}</p>
          <p className="text-sm text-blue-100">Active Prescriptions</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-2xl text-white mb-1">{stats.medicalConditions}</p>
          <p className="text-sm text-blue-100">Medical Conditions</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-blue-100 mb-1">Last Visit</p>
          <p className="text-white">{stats.lastVisit}</p>
        </div>
      </div>
    </div>
  );
}
