import Prescriptions from "@/shared/components/PatientMedicalRecords/Prescriptions/Prescriptions";
import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { TabsSkeleton } from "../skeletons";
import { patientData } from "@/shared/types/Roletype";
import { Prescription } from "@/shared/types/patientRecords";
import AddPrescription from "@/role/doctor/modals/AddPrescription";
import { useSearchParams } from "next/navigation";
import usePrescriptionsTabHook from "@/shared/hooks/PrescriptionsTabHook";

interface PrescriptionsTabProps {
  patient: patientData | undefined;
  isUnknown?: boolean;
  prescriptions: Prescription[];
  isPending: boolean;
  openAddPrescription?: () => void;
  startEditPrescription?: (id: string) => void;
  handleRevoke?: (p: string) => void;
  isDoctor?: boolean;
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
    // prescriptionOpen,
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
          // form={form}
          // open={prescriptionOpen}
          // validate={validate}
          // isEdit={isEdit}
          // prescriptionId={editingId ?? undefined}
          // handleChange={handleChange}
          // onOpenChange={(open) => {
          //   if (!open) closePrescriptionModal();
          // }}
          // patientName={patient.name}
          // patientMeta={`${patient.age}/${patient.gender[0]}`}
          // onCreate={handleCreatePrescription}
          // handlePrescriptionEdit={handlePrescriptionEdit}
          // emptyForm={emptyForm}
          patientId={patient.id}
          patientName={patient.name}
          patientMeta={`${patient.age}/${patient.gender}`}
        />
      )}
    </>
  );
}
