import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  PatientInformationType,
  PatientProfile,
} from "../../../shared/types/patientRecords";
import {
  patientProfilesList,
  patientsList,
  prescriptions,
  visits,
  vitals,
} from "../../../shared/constants/patientRecords";
import { Gender, UserRole } from "@/shared/types/Roletype";
import { useAuth } from "@/providers/AuthProvider";

export default function usePatientRecordsPageHook() {
  const searchParams = useSearchParams();

  const { role } = useAuth();
  const [patients, setPatients] =
    useState<PatientInformationType[]>(patientsList);

  const [patientProfiles, setPatientProfiles] =
    useState<PatientProfile[]>(patientProfilesList);

  const selectedPatientId = searchParams.get("patientID");

  const selectedProfile = selectedPatientId
    ? patientProfiles.find((p) => p.id === selectedPatientId)
    : undefined;

  const patientVitals = selectedPatientId
    ? vitals.filter((p) => p.patientId === selectedPatientId)
    : [];

  const patientVisits = selectedPatientId
    ? visits.filter((p) => p.patientId === selectedPatientId)
    : [];

  const patientData = patientProfilesList.find(
    (p) => p.id === selectedPatientId,
  )!;

  const updatePatient = {
    ...patientData,
    role: "patient" as UserRole,
    gender: patientData?.gender as Gender,
  };

  const patientPrescription = selectedPatientId
    ? prescriptions.filter((p) => p.patientId === selectedPatientId)
    : [];

  const isUnknownPatient = !!selectedPatientId && !selectedProfile;

  // Here Fetch Data with React Query
  const isPending = false;
  return {
    isUnknownPatient,
    patients,
    setPatients,
    setPatientProfiles,
    selectedPatientId,
    selectedProfile,
    isPending,
    patientVitals,
    patientVisits,
    patientPrescription,
    patientData: updatePatient,
    isDoctor: role === "doctor",
  };
}
