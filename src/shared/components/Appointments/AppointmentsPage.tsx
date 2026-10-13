import PageTitleWithButton from "@/shared/components/page-title/PageTitleWithButton";
import AppointmentFilter from "@/shared/components/Appointments/AppointmentFilter";
import AppointmentComponent from "@/shared/components/Appointments/AppointmentComponent";
import AppointmentHeaderAction from "@/shared/components/Appointments/AppointmentHeaderAction";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <PageTitleWithButton
        title="Appointments Management"
        subtitle="Schedule and manage appointments"
        action={<AppointmentHeaderAction />}
      />

      <AppointmentFilter />

      <AppointmentComponent />
    </div>
  );
}
