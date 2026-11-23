import Prescriptions from "@/shared/components/PatientMedicalRecords/Prescriptions/Prescriptions";
import NoPatientChoose from "../NoPatientChoose";
import UnknownPatient from "../UnknownPatient";
import { TabsSkeleton } from "../skeletons";
import { PatientProfile, Prescription } from "@/shared/types/patientRecords";
import { useSearchParams } from "next/navigation";

interface PrescriptionsTabProps {
  patient: PatientProfile | undefined;
  isUnknown?: boolean;
  prescriptions: Prescription[];
  isPending: boolean;
  isDoctor?: boolean;
  DeletePrescription?: (id: string) => void;
  EditPrescription?: (id: string, p: Prescription) => void;
  AddPrescription?: (p: Prescription) => void;
}

export default function PrescriptionsTab({
  patient,
  isUnknown,
  prescriptions,
  isPending,
  isDoctor,
  DeletePrescription,
  EditPrescription,
  AddPrescription,
}: PrescriptionsTabProps) {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientID");

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
          patient={patient}
          onDelete={DeletePrescription}
          EditPrescription={EditPrescription}
          AddPrescription={AddPrescription}
        />
      )}
    </>
  );
}
