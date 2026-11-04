import AppointmentsPage from "@/shared/components/Appointments/AppointmentsPage";
import { appointmentsMonth } from "@/shared/constants/appointments";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ month: string }>;
}) {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  const formattedDate = [
    firstDay.getFullYear(),
    String(firstDay.getMonth() + 1).padStart(2, "0"),
    String(firstDay.getDate()).padStart(2, "0"),
  ].join("-");

  const { month } = await searchParams;
  const thisMonth = month ? `${month}-01` : formattedDate;
  const appointments = appointmentsMonth.find((a) => a.start === thisMonth)!;
  return <AppointmentsPage initialAppointments={appointments.appointments} />;
}
