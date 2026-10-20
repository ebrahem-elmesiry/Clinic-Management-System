"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import PageTitleWithButton from "@/shared/components/page-title/PageTitleWithButton";
import SelectedPatient from "@/shared/components/PatientRecords/SelectedPatient";
import AddPatientModal from "@/role/admin/modals/AddPatientModal";
import VisitHistoryTab from "./tabs/VisitHistoryTab";
import VitalsTab from "./tabs/VitalsTab";
import PrescriptionsTab from "./tabs/PrescriptionsTab";
import { PatientInformationSkeleton } from "./skeletons";
import PatientInformation from "@/shared/components/PatientRecords/PatientInformation";
import usePatientRecordsPageHook from "@/shared/hooks/PatientRecordsPageHook";
import { Suspense } from "react";

export default function PatientRecordsPage() {
  const {
    isUnknownPatient,
    patients,
    setPatients,
    setPatientProfiles,
    selectedPatientId,
    tab,
    selectedProfile,
    handleTabChange,
    isPending,
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

          <Tabs
            value={tab}
            onValueChange={handleTabChange}
            className="space-y-6"
          >
            <TabsList className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <TabsTrigger value="visit-history">Visit History</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            </TabsList>
          </Tabs>

          {tab === "visit-history" && (
            <VisitHistoryTab
              patient={selectedProfile}
              isUnknown={isUnknownPatient}
              patientId={selectedPatientId}
            />
          )}
          {tab === "vitals" && (
            <VitalsTab
              patient={selectedProfile}
              isUnknown={isUnknownPatient}
              patientId={selectedPatientId}
            />
          )}
          {tab === "prescriptions" && (
            <PrescriptionsTab
              patient={selectedProfile}
              isUnknown={isUnknownPatient}
              patientId={selectedPatientId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
