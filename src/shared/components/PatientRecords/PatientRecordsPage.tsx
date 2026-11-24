"use client";

import PageTitleWithButton from "@/shared/components/page-title/PageTitleWithButton";
import SelectedPatient from "@/shared/components/PatientRecords/SelectedPatient";
import AddPatientModal from "@/role/admin/modals/AddPatientModal";
import PatientInformation from "@/shared/components/PatientRecords/PatientInformation";
import usePatientRecordsPageHook from "@/role/admin/hooks/usePatientRecordsPageHook";
import { Suspense } from "react";
import PatientRecordsWrapper from "./PatientRecordsWrapper";
import usePatientRecordsSearchHook from "@/shared/hooks/usePatientRecordsSearchHook";

export default function PatientRecordsPage() {
  const {
    isUnknownPatient,
    isPending,
    selectedPatientId,
    selectedProfile,
    patientVisits,
    patientVitals,
    patientPrescriptions,
    isDoctor,
    patientProfiles,
    setPatientProfiles,
    handlePatientURL,
    DeletePrescription,
    EditPrescription,
    AddPrescription,
  } = usePatientRecordsPageHook();

  const { search, query, handlePatientSearch, isPendingSearch } =
    usePatientRecordsSearchHook(patientProfiles);

  return (
    <div className="space-y-6">
      <PageTitleWithButton
        title="Patient Records"
        subtitle="View and manage patient medical information"
        action={<AddPatientModal setPatientProfiles={setPatientProfiles} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SelectedPatient
          isPending={isPendingSearch}
          handlePatientURL={handlePatientURL}
          search={search}
          query={query}
          handlePatientSearch={handlePatientSearch}
          selectedPatientId={selectedPatientId}
        />

        <div className="lg:col-span-3 space-y-6">
          <PatientInformation
            isPending={isPending}
            patient={selectedProfile}
            isUnknown={isUnknownPatient}
            patientId={selectedPatientId}
          />

          <PatientRecordsWrapper
            isUnknownPatient={isUnknownPatient}
            isDoctor={isDoctor}
            isPending={isPending}
            patient={selectedProfile}
            vitals={patientVitals}
            visits={patientVisits}
            prescriptions={patientPrescriptions}
            DeletePrescription={DeletePrescription}
            EditPrescription={EditPrescription}
            AddPrescription={AddPrescription}
          />
        </div>
      </div>
    </div>
  );
}
