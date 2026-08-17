"use client";

import React from "react";
import { User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import VisitHistory from "@/shared/components/PatientMedicalRecords/VisitHistory";
import Vitals from "@/shared/components/PatientMedicalRecords/Vitals";
import Prescriptions from "@/shared/components/PatientMedicalRecords/Prescriptions";

const visits = [
  {
    date: "Dec 20, 2024",
    doctor: "Dr. Sarah Johnson",
    reason: "Regular Checkup",
    diagnosis: "Stable condition, blood pressure normal",
    prescription: "Continue current medication",
    followUp: "None required",
  },
  {
    date: "Nov 15, 2024",
    doctor: "Dr. Michael Chen",
    reason: "Consultation - Chest Pain",
    diagnosis: "Anxiety-related chest pain, ECG normal",
    prescription: "Prescribed relaxation exercises",
    followUp: "2 weeks",
  },
  {
    date: "Oct 10, 2024",
    doctor: "Dr. Sarah Johnson",
    reason: "Blood Sugar Monitoring",
    diagnosis: "Blood sugar levels within target range",
    prescription: "Continue Metformin 500mg",
    followUp: "1 month",
  },
];

const vitals = [
  { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal" },
  { label: "Heart Rate", value: "72", unit: "bpm", status: "normal" },
  { label: "Temperature", value: "98.6", unit: "°F", status: "normal" },
  { label: "Blood Sugar", value: "105", unit: "mg/dL", status: "normal" },
  { label: "Weight", value: "180", unit: "lbs", status: "normal" },
  { label: "Height", value: "5'10\"", unit: "", status: "normal" },
];

export default function PatientMedicalRecordsRoute() {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white mb-1">My Medical Records</h1>
            <p className="text-blue-100">View your personal health information</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="visits" className="space-y-6">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="visits">Visit History</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="visits">
          <VisitHistory visits={visits} />
        </TabsContent>

        <TabsContent value="vitals">
          <Vitals vitals={vitals} />
        </TabsContent>

        <TabsContent value="prescriptions">
          <Prescriptions />
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-xs">🔒</span>
        </div>
        <div>
          <p className="text-sm text-gray-900 mb-1">View-Only Access</p>
          <p className="text-xs text-gray-600">
            You can only view your own medical records. This data is encrypted
            and secured.
          </p>
        </div>
      </div>
    </div>
  );
}
