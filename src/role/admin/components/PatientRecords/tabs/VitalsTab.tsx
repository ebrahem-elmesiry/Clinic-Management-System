"use client";

import { useState } from "react";
import Vitals from "@/shared/components/PatientMedicalRecords/Vitals/Vitals";
import AddOrEditVitals, {
  type VitalsFormData,
} from "../../../modals/AddOrEditVitals";
import { vitals } from "../../../constants/patientRecords";
import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { TabsSkeleton } from "../skeletons";

interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
}

interface VitalsTabProps {
  patient?: PatientProfile;
  isUnknown?: boolean;
  patientId?: string | null;
}

export default function VitalsTab({
  patient,
  isUnknown,
  patientId,
}: VitalsTabProps) {
  const [vitalsOpen, setVitalsOpen] = useState(false);
  const [localVitals, setLocalVitals] = useState(vitals);

  if (isUnknown) return <UnknownPatient patientId={patientId} />;

  if (!patient) return <NoPatientChoose />;

  const patientVitals = localVitals.filter((v) => v.patientId === patient.id);

  const vitalsInitialData: VitalsFormData = {
    bloodPressure: patientVitals[0]?.value ?? "",
    heartRate: patientVitals[1]?.value ?? "",
    temperature: patientVitals[2]?.value ?? "",
    bloodSugar: patientVitals[3]?.value ?? "",
    weight: patientVitals[4]?.value ?? "",
    height: patientVitals[5]?.value ?? "",
  };

  const handleSaveVitals = (data: VitalsFormData) => {
    setLocalVitals((prev) => {
      const others = prev.filter((v) => v.patientId !== patient.id);
      const updated = [
        {
          patientId: patient.id,
          label: "Blood Pressure",
          value: data.bloodPressure,
          unit: "mmHg",
          status: "normal",
        },
        {
          patientId: patient.id,
          label: "Heart Rate",
          value: data.heartRate,
          unit: "bpm",
          status: "normal",
        },
        {
          patientId: patient.id,
          label: "Temperature",
          value: data.temperature,
          unit: "°F",
          status: "normal",
        },
        {
          patientId: patient.id,
          label: "Blood Sugar",
          value: data.bloodSugar,
          unit: "mg/dL",
          status: "normal",
        },
        {
          patientId: patient.id,
          label: "Weight",
          value: data.weight,
          unit: "lbs",
          status: "normal",
        },
        {
          patientId: patient.id,
          label: "Height",
          value: data.height,
          unit: "",
          status: "normal",
        },
        ...others,
      ];
      return updated;
    });
  };
  const isPending = false;
  return (
    <>
      {isPending ? (
        <TabsSkeleton variant="vitals" />
      ) : (
        <Vitals
          vitals={patientVitals}
          doctor
          onAddEdit={() => setVitalsOpen(true)}
        />
      )}

      <AddOrEditVitals
        open={vitalsOpen}
        onOpenChange={setVitalsOpen}
        patientName={patient.name}
        patientMeta={`${patient.age}/${patient.gender[0]} · ${patient.bloodGroup}`}
        initialData={vitalsInitialData}
        isEdit={patientVitals.length > 0}
        onSave={handleSaveVitals}
      />
    </>
  );
}
