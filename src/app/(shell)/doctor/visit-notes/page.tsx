import VisitNotesPage from "@/role/doctor/components/VisitNote/VisitNotesPage";
import { AppointmentType } from "@/role/doctor/types/visit-notes";
import { doctors } from "@/shared/constants/appointments";

export default async function DoctorVisitNotesRoute({
  searchParams,
}: {
  searchParams: Promise<{ appointment_id: string }>;
}) {
  const { appointment_id } = await searchParams;
  const isPending = false;
  const patientData = {
    patientId: "patientId",
    name: "John Smith",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    reason: "Regular Checkup",
    appointmentType: "follow-up" as AppointmentType,
    doctor_id: doctors[0].id,
    specialty_id: doctors[0].specialty_id,
    appointment_id: "appointment_id",
  };
  return <VisitNotesPage isPending={isPending} patientData={patientData} />;
}
