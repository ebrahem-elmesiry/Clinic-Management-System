"use client";

import { useState } from "react";
import { toast } from "sonner";
import Prescriptions from "@/shared/components/PatientMedicalRecords/Prescriptions/Prescriptions";
import AddPrescription from "../../../modals/AddPrescription";

import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { Prescription } from "@/role/admin/types/patientRecords";
import { prescriptions } from "@/role/admin/constants/patientRecords";
import { TabsSkeleton } from "../skeletons";

interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
}

interface PrescriptionsTabProps {
  patient?: PatientProfile;
  isUnknown?: boolean;
  patientId?: string | null;
}

export default function PrescriptionsTab({
  patient,
  isUnknown,
  patientId,
}: PrescriptionsTabProps) {
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);
  const [localPrescriptions, setLocalPrescriptions] =
    useState<Prescription[]>(prescriptions);

  if (isUnknown) return <UnknownPatient patientId={patientId} />;

  if (!patient) return <NoPatientChoose />;

  const patientPrescriptions = localPrescriptions.filter(
    (p) => p.patientId === patient.id,
  );

  const handleCreatePrescription = (data: {
    medicineName: string;
    dosage: string;
    frequency: string;
    timing: string;
    duration: string;
    specialInstructions?: string;
    notes?: string;
    date: string;
  }) => {
    const newRx: Prescription = {
      id: `rx-${Date.now()}`,
      patientId: patient.id,
      medicineName: data.medicineName,
      dosage: data.dosage,
      frequency: data.frequency,
      timing: data.timing,
      duration: data.duration,
      specialInstructions: data.specialInstructions,
      notes: data.notes,
      status: "Active",
      prescribedBy: "Dr. Sarah Johnson",
      date: data.date,
    };
    setLocalPrescriptions((prev) => [newRx, ...prev]);
  };

  const handleRevoke = (rx: Prescription) => {
    setLocalPrescriptions((prev) =>
      prev.map((p) => (p.id === rx.id ? { ...p, status: "Revoked" } : p)),
    );
    toast.success("Prescription revoked");
  };

  const isPending = false;

  return (
    <>
      {isPending ? (
        <TabsSkeleton variant="prescriptions" />
      ) : (
        <Prescriptions
          doctor
          prescriptions={patientPrescriptions}
          onAdd={() => setPrescriptionOpen(true)}
          onViewPDF={() => toast.info("PDF preview — local mock")}
          onRevoke={handleRevoke}
        />
      )}
      <AddPrescription
        open={prescriptionOpen}
        onOpenChange={setPrescriptionOpen}
        patientName={patient.name}
        patientMeta={`${patient.age}/${patient.gender[0]}`}
        onCreate={handleCreatePrescription}
        onSaveDraft={handleCreatePrescription}
      />
    </>
  );
}
