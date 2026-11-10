"use client";

import Prescriptions from "@/shared/components/PatientMedicalRecords/Prescriptions/Prescriptions";
import AddPrescription from "@/role/doctor/modals/AddPrescription";

import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { TabsSkeleton } from "../skeletons";
import usePrescriptionsTabHook from "@/shared/hooks/PrescriptionsTabHook";
import { Prescription } from "@/shared/types/patientRecords";
import { useSearchParams } from "next/navigation";
import { patientData } from "@/shared/types/Roletype";

interface PrescriptionsTabProps {
  patient: patientData;
  isUnknown?: boolean;
  prescriptions: Prescription[];
  isDoctor: boolean;
  isPending: boolean;
}

export default function PrescriptionsTab({
  patient,
  isUnknown,
  prescriptions,
  isPending,
  isDoctor,
}: PrescriptionsTabProps) {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientID");
  const {
    form,
    isEdit,
    editingId,
    prescriptionOpen,
    // isDoctor,
    // patientPrescriptions,
    // isPending,
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
