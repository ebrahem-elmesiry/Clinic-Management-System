"use client";

import { useState } from "react";
import Vitals from "@/shared/components/PatientMedicalRecords/Vitals/Vitals";

import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { TabsSkeleton } from "../skeletons";
import { useAuth } from "@/providers/AuthProvider";
import { PatientProfile, Vital } from "@/shared/types/patientRecords";
import { VitalsFormData } from "@/role/doctor/validations/validation";
import AddOrEditVitals from "@/role/doctor/modals/AddOrEditVitals";

interface VitalsTabProps {
  patient: PatientProfile | undefined;
  isUnknown?: boolean;
  vitals: Vital[];
  isPending: boolean;
}

export default function VitalsTab({
  patient,
  isUnknown,
  vitals,
  isPending,
}: VitalsTabProps) {
  const [vitalsOpen, setVitalsOpen] = useState(false);
  const [localVitals, setLocalVitals] = useState(vitals);
  const { role } = useAuth();
  const isDoctor = role === "doctor";

  if (isPending) return <TabsSkeleton variant="vitals" />;
  if (isUnknown) return <UnknownPatient patientId={patient?.id} />;

  if (!patient) return <NoPatientChoose />;

  const vitalsMap: Record<string, string> = Object.fromEntries(
    localVitals.map((v) => [v.label.toLowerCase().replace(/\s/g, ""), v.value]),
  );

  const vitalsInitialData: VitalsFormData = {
    bloodPressure: vitalsMap["bloodpressure"] ?? "",
    heartRate: vitalsMap["heartrate"] ?? "",
    temperature: vitalsMap["temperature"] ?? "",
    bloodSugar: vitalsMap["bloodsugar"] ?? "",
    weight: vitalsMap["weight"] ?? "",
    height: vitalsMap["height"] ?? "",
  };

  const handleSaveVitals = (data: VitalsFormData) => {
    const vitalsConfig = [
      { key: "bloodPressure", label: "Blood Pressure", unit: "mmHg" },
      { key: "heartRate", label: "Heart Rate", unit: "bpm" },
      { key: "temperature", label: "Temperature", unit: "°F" },
      { key: "bloodSugar", label: "Blood Sugar", unit: "mg/dL" },
      { key: "weight", label: "Weight", unit: "lbs" },
      { key: "height", label: "Height", unit: "cm" },
    ] as const;

    setLocalVitals((prev) => {
      const others = prev.filter((v) => v.patientId !== patient.id);

      const updated = vitalsConfig.map((vital) => ({
        patientId: patient.id,
        label: vital.label,
        value: data[vital.key],
        unit: vital.unit,
        status: "normal",
      }));

      return [...updated, ...others];
    });
  };
  return (
    <>
      <Vitals
        vitals={localVitals}
        doctor={isDoctor}
        onAddEdit={() => setVitalsOpen(true)}
      />

      {isDoctor && (
        <AddOrEditVitals
          open={vitalsOpen}
          onOpenChange={setVitalsOpen}
          patientName={patient.name}
          patientMeta={`${patient.age}/${patient.gender} · ${patient.bloodGroup}`}
          initialData={vitalsInitialData}
          isEdit={
            localVitals.filter((v) => v.patientId === patient.id).length > 0
          }
          onSave={handleSaveVitals}
        />
      )}
    </>
  );
}
