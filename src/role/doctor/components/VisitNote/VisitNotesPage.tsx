"use client";

import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import PatientInformation from "@/role/doctor/components/VisitNote/PatientInformation";
import VisitStatus from "@/role/doctor/components/VisitNote/VisitStatus";
import MedicationsPrescription from "@/role/doctor/components/VisitNote/MedicationsPrescription";
import DoctorNotes from "@/role/doctor/components/VisitNote/DoctorNotes";
import FollowUp from "@/role/doctor/components/VisitNote/FollowUp";
import Diagnosis from "./Diagnosis";
import VisitNotesPageHook from "@/role/doctor/hooks/VisitNotesPageHook";

export default function VisitNotesPage() {
  const {
    status,
    setStatus,
    cancelReason,
    setCancelReason,
    cancelNote,
    setCancelNote,
    medicines,
    addMedicine,
    removeMedicine,
    updateMedicine,
    diagnosis,
    setDiagnosis,
    doctorNotes,
    setDoctorNotes,
    followUp,
    nextAppointment,
    handleFollowUpNo,
    handleScheduleFollowUp,
  } = VisitNotesPageHook();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-slate-100 mb-2">
          Visit Notes
        </h1>
        <p className="text-gray-600 dark:text-slate-300">
          Record medications, prescription, visit outcome, and follow-up plan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PatientInformation
            name="John Smith"
            age={45}
            gender="Male"
            bloodGroup="O+"
            reason="Regular Checkup"
            appointmentType="Regular"
          />
          <VisitStatus
            status={status}
            onStatusChange={setStatus}
            cancelReason={cancelReason}
            onCancelReasonChange={setCancelReason}
            cancelNote={cancelNote}
            onCancelNoteChange={setCancelNote}
          />
          <MedicationsPrescription
            medicines={medicines}
            onAddMedicine={addMedicine}
            onRemoveMedicine={removeMedicine}
            onUpdateMedicine={updateMedicine}
          />
          <Diagnosis value={diagnosis} onChange={setDiagnosis} />
          <DoctorNotes value={doctorNotes} onChange={setDoctorNotes} />

          <FollowUp
            followUp={followUp}
            nextAppointment={nextAppointment}
            patientName="John Smith"
            specialty="General Physician"
            appointmentType="followup"
            onNo={handleFollowUpNo}
            onSchedule={handleScheduleFollowUp}
          />

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button className="flex-1" onClick={() => setStatus("completed")}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Complete Visit
            </Button>
            <Button variant="teal" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
