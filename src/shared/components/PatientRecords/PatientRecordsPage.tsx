"use client";

import PageTitleWithButton from "@/shared/components/page-title/PageTitleWithButton";
import SelectedPatient from "@/shared/components/PatientRecords/SelectedPatient";
import AddPatientModal from "@/role/admin/modals/AddPatientModal";
import { PatientInformationSkeleton } from "./skeletons";
import PatientInformation from "@/shared/components/PatientRecords/PatientInformation";
import usePatientRecordsPageHook from "@/role/admin/hooks/PatientRecordsPageHook";
import { Suspense } from "react";
import PatientRecordsWrapper from "./PatientRecordsWrapper";

export default function PatientRecordsPage() {
  const {
    isUnknownPatient,
    patients,
    setPatients,
    setPatientProfiles,
    selectedPatientId,
    selectedProfile,
    isPending,
    patientVisits,
    patientVitals,
    patientPrescription,
    patientData,
    isDoctor,
  } = usePatientRecordsPageHook();

  return (
    <div className="space-y-6">
      <PageTitleWithButton
        title="Patient Records"
        subtitle="View and manage patient medical information"
        action={
          <Suspense>
            <AddPatientModal
              setPatients={setPatients}
              setPatientProfiles={setPatientProfiles}
            />
          </Suspense>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Suspense>
          <SelectedPatient
            patients={patients}
            selectedPatient={selectedPatientId}
          />
        </Suspense>

        <div className="lg:col-span-3 space-y-6">
          {isPending ? (
            <PatientInformationSkeleton />
          ) : (
            <PatientInformation
              patient={selectedProfile}
              isUnknown={isUnknownPatient}
              patientId={selectedPatientId}
            />
          )}

          <PatientRecordsWrapper
            isDoctor={isDoctor}
            isPending={isPending}
            patient={patientData}
            vitals={patientVitals}
            visits={patientVisits}
            prescriptions={patientPrescription}
          />
        </div>
      </div>
    </div>
  );
}
