import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  PatientInformationType,
  PatientProfile,
} from "../types/patientRecords";
import { patientProfilesList, patientsList } from "../constants/patientRecords";

export default function usePatientRecordsPageHook() {
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
    ? patientProfiles.find((p) => p.id === selectedPatientId)
    : undefined;

  const isUnknownPatient = !!selectedPatientId && !selectedProfile;

  function handleTabChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // Here Fetch Data with React Query
  const isPending = false;
  return {
    isUnknownPatient,
    patients,
    setPatients,
    setPatientProfiles,
    selectedPatientId,
    tab,
    selectedProfile,
    handleTabChange,
    isPending,
  };
}
