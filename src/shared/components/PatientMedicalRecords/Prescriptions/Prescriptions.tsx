"use client";

import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import WrapperComponent from "../../WrapperComponent";
import PrescriptionCard from "@/shared/components/PatientRecords/PrescriptionCard";
import EmptyPrescriptions from "./EmptyPrescriptions";
import AddPrescriptionModal from "@/role/doctor/modals/AddPrescription";
import usePrescriptionHook from "@/shared/hooks/usePrescriptionHook";
import { PatientProfile, Prescription } from "@/shared/types/patientRecords";

interface PrescriptionsProps {
  doctor?: boolean;
  prescriptions?: Prescription[];
  patient: PatientProfile | undefined;
  onDelete?: (id: string) => void;
  EditPrescription?: (id: string, p: Prescription) => void;
  AddPrescription?: (p: Prescription) => void;
}

export default function Prescriptions({
  doctor = false,
  prescriptions = [],
  patient,
  onDelete,
  EditPrescription,
  AddPrescription,
}: PrescriptionsProps) {
  const {
    prescriptionOpen,
    isEdit,
    editingId,
    form,
    handleChange,
    validate,
    emptyForm,
    openAddPrescription,
    closePrescriptionModal,
    startEditPrescription,
  } = usePrescriptionHook({ prescriptions });

  return (
    <WrapperComponent
      showButton={doctor}
      Button={
        <Button onClick={openAddPrescription}>
          <Plus className="w-4 h-4 mr-2" />
          Add Prescription
        </Button>
      }
      title="Current Prescriptions"
    >
      {prescriptions.length === 0 ? (
        <EmptyPrescriptions />
      ) : (
        <div className="space-y-4">
          {prescriptions.map((p) => (
            <PrescriptionCard
              isDoctor={doctor}
              key={p.id}
              prescription={p}
              onDelete={onDelete}
              startEdit={startEditPrescription}
            />
          ))}
        </div>
      )}

      {doctor && (
        <AddPrescriptionModal
          form={form}
          open={prescriptionOpen}
          validate={validate}
          isEdit={isEdit}
          prescriptionId={editingId}
          handleChange={handleChange}
          onOpenChange={(open) => {
            if (!open) closePrescriptionModal();
          }}
          patientName={patient?.name}
          patientMeta={`${patient?.age}/${patient?.gender}`}
          onCreate={AddPrescription}
          handlePrescriptionEdit={EditPrescription}
          emptyForm={emptyForm}
        />
      )}
    </WrapperComponent>
  );
}
