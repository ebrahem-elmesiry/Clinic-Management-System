"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import PageTitleWithButton from "@/shared/components/page-title/PageTitleWithButton";
import SelectedPatient from "@/shared/components/PatientRecords/SelectedPatient";
import AddPatientModal from "../../modals/AddPatientModal";
import {
  patientsList,
  patientProfilesList,
} from "../../constants/patientRecords";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import VisitHistoryTab from "./tabs/VisitHistoryTab";
import VitalsTab from "./tabs/VitalsTab";
import PrescriptionsTab from "./tabs/PrescriptionsTab";
import { useState } from "react";
import { PatientInformationSkeleton } from "./skeletons";
import {
  PatientInformationType,
  PatientProfile,
} from "../../types/patientRecords";
import PatientInformation from "@/shared/components/PatientRecords/PatientInformation";

export default function PatientRecordsPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [patients, setPatients] =
    useState<PatientInformationType[]>(patientsList);

  const [patientProfiles, setPatientProfiles] =
    useState<PatientProfile[]>(patientProfilesList);

  const selectedPatientId = searchParams.get("patientID");
  const tab = searchParams.get("tab") ?? "visit-history";

  const selectedProfile = selectedPatientId
    ? patientProfiles.find((p) => String(p.id) === selectedPatientId)
    : undefined;

  const isUnknownPatient = !!selectedPatientId && !selectedProfile;

  function handleTabChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // Here Fetch Data with React Query
  const isPending = false;

  return (
    <div className="space-y-6">
      <PageTitleWithButton
        title="Patient Records"
        subtitle="View and manage patient medical information"
        action={
          <AddPatientModal
            setPatients={setPatients}
            setPatientProfiles={setPatientProfiles}
          />
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SelectedPatient
          patients={patients}
          selectedPatient={selectedPatientId}
        />

        <div className="lg:col-span-3 space-y-6">
          {isPending ? (
            <PatientInformationSkeleton />
          ) : (
            <PatientInformation
              patient={selectedProfile as any}
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
              patient={selectedProfile as any}
              isUnknown={isUnknownPatient}
              patientId={selectedPatientId}
            />
          )}
          {tab === "vitals" && (
            <VitalsTab
              patient={selectedProfile as any}
              isUnknown={isUnknownPatient}
              patientId={selectedPatientId}
            />
          )}
          {tab === "prescriptions" && (
            <PrescriptionsTab
              patient={selectedProfile as any}
              isUnknown={isUnknownPatient}
              patientId={selectedPatientId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
