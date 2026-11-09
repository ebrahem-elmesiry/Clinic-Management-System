import Prescriptions from "@/shared/components/PatientMedicalRecords/Prescriptions/Prescriptions";
import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { TabsSkeleton } from "../skeletons";
import { patientData } from "@/shared/types/Roletype";
import { Prescription } from "@/shared/types/patientRecords";
import AddPrescription from "@/role/doctor/modals/AddPrescription";

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
  openAddPrescription,
  startEditPrescription,
  handleRevoke,
  isDoctor,
}: PrescriptionsTabProps) {
  if (isUnknown) return <UnknownPatient patientId={patient?.id} />;

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
          patientId={patient.id}
          patientName={patient.name}
          patientMeta={`${patient.age}/${patient.gender}`}
        />
      )}
    </>
  );
}
