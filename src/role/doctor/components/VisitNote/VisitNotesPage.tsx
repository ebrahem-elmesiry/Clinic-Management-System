"use client";

import React, { useState } from "react";
import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import PatientInformation from "@/role/doctor/components/VisitNote/PatientInformation";
import VisitStatus from "@/role/doctor/components/VisitNote/VisitStatus";
import MedicationsPrescription from "@/role/doctor/components/VisitNote/MedicationsPrescription";
import DoctorNotes from "@/role/doctor/components/VisitNote/DoctorNotes";
import FollowUp from "@/role/doctor/components/VisitNote/FollowUp";
import RecentVisits from "@/role/doctor/components/VisitNote/RecentVisits";

type VisitStatusValue = "scheduled" | "completed" | "cancelled";

export default function VisitNotesPage() {
  const [status, setStatus] = useState<VisitStatusValue>("scheduled");

  const recentVisits = [
    {
      id: 1,
      patient: "John Smith",
      date: "Dec 20, 2024",
      medicines: 3,
      doctor: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      patient: "Emma Wilson",
      date: "Dec 19, 2024",
      medicines: 2,
      doctor: "Dr. Sarah Johnson",
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Visit Notes</h1>
        <p className="text-gray-600">
          Record medications, prescription, visit outcome, and follow-up plan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PatientInformation />
          <VisitStatus status={status} onStatusChange={setStatus} />
          <MedicationsPrescription />
          <DoctorNotes />
          <FollowUp />

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => setStatus("completed")}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Complete Visit
            </Button>
            <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <RecentVisits visits={recentVisits} />
        </div>
      </div>
    </div>
  );
}
