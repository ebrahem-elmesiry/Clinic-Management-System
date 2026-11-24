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
import { PatientData } from "../../types/visit-notes";
import VisitNotesSkeleton from "../skeleton/VisitNotesSkeleton";

export default function VisitNotesPage({
  patientData,
  isPending,
}: {
  patientData: PatientData;
  isPending: boolean;
}) {
  const {
    visitNotes,
    updateVisitNotes,
    cancellation,
    updateCancellation,
    medicines,
    addMedicine,
    removeMedicine,
    updateMedicine,
    handleFollowUpNo,
    handleScheduleFollowUp,
    CompleteVisit,
    ExportPDF,
    onStartSchedule,
    showCancel,
    confirmCancel,
    setShowCancelFn,
  } = VisitNotesPageHook();

  if (isPending) return <VisitNotesSkeleton />;
  const { status, diagnosis, doctorNotes, followUp, nextAppointment } =
    visitNotes;

  const prefill = {
    patientName: patientData.name,
    specialtyId: patientData.specialty_id,
    appointmentType: patientData.appointmentType,
  };

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

      <div className="lg:col-span-2 space-y-6">
        <PatientInformation
          name={patientData.name}
          age={patientData.age}
          gender={patientData.gender}
          bloodGroup={patientData.bloodGroup}
          reason={patientData.reason}
          appointmentType={patientData.appointmentType}
        />
        <VisitStatus
          status={status}
          showCancel={showCancel}
          confirmCancel={confirmCancel}
          setShowCancelFn={setShowCancelFn}
          cancelReason={cancellation.cancelReason}
          onCancelReasonChange={(v) => updateCancellation("cancelReason", v)}
          cancelNote={cancellation.cancelNote}
          onCancelNoteChange={(v) => updateCancellation("cancelNote", v)}
        />
        <MedicationsPrescription
          medicines={medicines}
          onAddMedicine={addMedicine}
          onRemoveMedicine={removeMedicine}
          onUpdateMedicine={updateMedicine}
        />
        <Diagnosis
          value={diagnosis}
          onChange={(v) => updateVisitNotes("diagnosis", v)}
        />
        <DoctorNotes
          value={doctorNotes}
          onChange={(v) => updateVisitNotes("doctorNotes", v)}
        />

        <FollowUp
          followUp={followUp}
          nextAppointment={nextAppointment}
          prefill={prefill}
          onNo={handleFollowUpNo}
          onSchedule={handleScheduleFollowUp}
          onStartSchedule={onStartSchedule}
        />

        <div className="flex gap-3">
          <Button className="flex-1" onClick={CompleteVisit}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Complete Visit
          </Button>
          <Button variant="teal" className="flex-1" onClick={ExportPDF}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
