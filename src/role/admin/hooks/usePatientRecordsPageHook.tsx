import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PatientProfile,
  Prescription,
  VisitRecord,
  Vital,
} from "../../../shared/types/patientRecords";
import {
  patientProfilesList,
  prescriptions,
  visits,
  vitals,
} from "../../../shared/constants/patientRecords";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import { format } from "date-fns";

export default function usePatientRecordsPageHook() {
  const { role } = useAuth();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { replace } = useRouter();
  const pathname = usePathname();

  const selectedPatientId = searchParams.get("patientID");

  const [isPending, setIsPending] = useState(true);

  const [patientProfiles, setPatientProfiles] =
    useState<PatientProfile[]>(patientProfilesList);

  const [selectedProfile, setSelectedProfile] = useState<
    PatientProfile | undefined
  >(undefined);

  const [patientPrescriptions, setPatientPrescription] = useState<
    Prescription[] | []
  >([]);
  const [vitalsData, setVitalsData] = useState<Vital[] | []>([]);
  const [visitsData, setVisitsData] = useState<VisitRecord[] | []>(visits);
  const [isUnknownPatient, setIsUnknownPatient] = useState(false);

  function handlePatientURL(patientId: string | null) {
    if (patientId) {
      params.set("patientID", patientId);
      if (!params.get("tab")) {
        params.set("tab", "visit-history");
      }
    }
    replace(`${pathname}?${params}`, { scroll: false });
    return patientId;
  }

  useEffect(() => {
    setIsPending(true);
    async function getPatientData(id: string | null) {
      const patientId = handlePatientURL(id);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const patientPrescription = patientId
        ? prescriptions.filter((p) => p.patientId === patientId)
        : [];

      const patientVitals = patientId
        ? vitals.filter((p) => p.patientId === patientId)
        : [];

      const patientVisits = patientId
        ? visits.filter((p) => p.patientId === patientId)
        : [];

      const selectedProfile = patientId
        ? patientProfiles.find((p) => p.id === patientId)
        : undefined;

      setPatientPrescription(patientPrescription);
      setVitalsData(patientVitals);
      setVisitsData(patientVisits);
      setSelectedProfile(selectedProfile);
      setIsPending(false);

      setIsUnknownPatient(!!patientId && !selectedProfile);
    }

    getPatientData(selectedPatientId);
  }, [selectedPatientId]);

  function DeletePrescription(id: string) {
    setPatientPrescription((prev) => prev.filter((p) => p.id !== id));
    toast.success("Prescription has been delete successfully");
  }

  function EditPrescription(id: string, prescription: Prescription) {
    setPatientPrescription((prev) =>
      prev.map((p) => (p.id === id ? prescription : p)),
    );
    toast.success("Prescription has been Edited successfully");
  }

  function AddPrescription(prescription: Prescription) {
    const getPatientId = searchParams.get("patientID");
    const date = format(Date.now(), "yyyy-MM-dd");
    if (!getPatientId) {
      toast.error("Please select a patient first.");
      return false;
    }
    const prescriptionData: Prescription = {
      ...prescription,
      id: crypto.randomUUID(),
      patientId: getPatientId,
      date,
      remainingDays: 6,
      status: "active",
    };
    setPatientPrescription((prev) => [...prev, prescriptionData]);
    toast.success("Prescription has been Added successfully");
  }

  return {
    isUnknownPatient,
    setPatientProfiles,
    selectedPatientId,
    isPending,
    patientVitals: vitalsData || [],
    patientVisits: visitsData || [],
    patientPrescriptions: patientPrescriptions || [],
    DeletePrescription,
    EditPrescription,
    AddPrescription,
    patientProfiles,
    selectedProfile,
    isDoctor: role === "doctor",
    handlePatientURL,
  };
}
