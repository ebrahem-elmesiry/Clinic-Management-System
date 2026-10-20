"use client";

import Prescriptions from "@/shared/components/PatientMedicalRecords/Prescriptions/Prescriptions";
import AddPrescription from "@/role/doctor/modals/AddPrescription";

import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { PatientProfile } from "@/shared/types/patientRecords";
import { TabsSkeleton } from "../skeletons";
import usePrescriptionsTabHook from "@/shared/hooks/PrescriptionsTabHook";

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
  } = usePrescriptionsTabHook({ patient });

  if (isUnknown) return <UnknownPatient patientId={patientId} />;

  if (!patient) return <NoPatientChoose />;

  return (
    <>
      {isPending ? (
        <TabsSkeleton variant="prescriptions" />
      ) : (
        <Prescriptions
          doctor={isDoctor}
          prescriptions={patientPrescriptions}
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
