"use client";

import { useState } from "react";
import Vitals from "@/shared/components/PatientMedicalRecords/Vitals/Vitals";

import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { TabsSkeleton } from "../skeletons";
import { useAuth } from "@/providers/AuthProvider";
import { patientData } from "@/shared/types/Roletype";
import { Vital } from "@/shared/types/patientRecords";
import AddOrEditVitals, {
  VitalsFormData,
} from "@/role/doctor/modals/AddOrEditVitals";

interface VitalsTabProps {
  patient: patientData | undefined;
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

  if (isUnknown) return <UnknownPatient patientId={patient?.id} />;

  if (!patient) return <NoPatientChoose />;

  const vitalsInitialData: VitalsFormData = {
    bloodPressure: localVitals[0]?.value ?? "",
    heartRate: localVitals[1]?.value ?? "",
    temperature: localVitals[2]?.value ?? "",
    bloodSugar: localVitals[3]?.value ?? "",
    weight: localVitals[4]?.value ?? "",
    height: localVitals[5]?.value ?? "",
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

  return (
    <>
      {isPending ? (
        <TabsSkeleton variant="vitals" />
      ) : (
        <Vitals
          vitals={localVitals}
          doctor={isDoctor}
          onAddEdit={() => setVitalsOpen(true)}
        />
      )}

      {isDoctor && (
        <AddOrEditVitals
          open={vitalsOpen}
          onOpenChange={setVitalsOpen}
          patientName={patient.name}
          patientMeta={`${patient.age}/${patient.gender[0]} ·`}
          // patientMeta={`${patient.age}/${patient.gender[0]} · ${patient.bloodGroup}`}
          initialData={vitalsInitialData}
          isEdit={localVitals.length > 0}
          onSave={handleSaveVitals}
        />
      )}
    </>
  );
}
