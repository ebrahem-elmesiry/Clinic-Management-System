"use client";

import Prescriptions from "@/shared/components/PatientMedicalRecords/Prescriptions/Prescriptions";
import AddPrescription from "@/role/doctor/modals/AddPrescription";

import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { TabsSkeleton } from "../skeletons";
import usePrescriptionsTabHook from "@/shared/hooks/PrescriptionsTabHook";
import { personalData } from "@/shared/types/type";
import { Prescription } from "@/shared/types/patientRecords";
import { useSearchParams } from "next/navigation";

interface PrescriptionsTabProps {
  patient: personalData | undefined;
  isUnknown?: boolean;
  prescriptions: Prescription[];
}

export default function PrescriptionsTab({
  patient,
  isUnknown,
  prescriptions,
}: PrescriptionsTabProps) {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientID");
  const {
    form,
    isEdit,
    editingId,
    prescriptionOpen,
    isDoctor,
    patientPrescriptions,
    isPending,
    handleChange,
    validate,
    openAddPrescription,
    closePrescriptionModal,
    startEditPrescription,
    handlePrescriptionEdit,
    emptyForm,
    handleCreatePrescription,
    handleRevoke,
  } = usePrescriptionsTabHook({ patientId });

  if (isUnknown) return <UnknownPatient patientId={patientId} />;

  if (!patient) return <NoPatientChoose />;

  return (
    <>
      {isPending ? (
        <TabsSkeleton variant="prescriptions" />
      ) : (
        <Prescriptions
          doctor={isDoctor}
          prescriptions={prescriptions}
          onAdd={openAddPrescription}
          onEdit={startEditPrescription}
          onRevoke={handleRevoke}
        />
      )}
      {isDoctor && (
        <AddPrescription
          form={form}
          open={prescriptionOpen}
          validate={validate}
          isEdit={isEdit}
          prescriptionId={editingId ?? undefined}
          handleChange={handleChange}
          onOpenChange={(open) => {
            if (!open) closePrescriptionModal();
          }}
          patientName={patient.name}
          patientMeta={`${patient.age}/${patient.gender[0]}`}
          onCreate={handleCreatePrescription}
          handlePrescriptionEdit={handlePrescriptionEdit}
          emptyForm={emptyForm}
        />
      )}
    </>
  );
}
