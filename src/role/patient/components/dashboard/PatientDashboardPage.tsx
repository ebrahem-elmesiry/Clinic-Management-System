import PatientInformation from "@/role/patient/components/dashboard/PatientInformation";
import UpcomingAppointments from "@/role/patient/components/dashboard/UpcomingAppointments";
import PageHero from "@/shared/components/PageHero";

// This would come from your authentication context/hook in a real application
// Example: const { user } = useAuth() or from session token

export default function PatientDashboard() {
  const authenticatedPatient = {
    id: "patient_12345",
    name: "John Doe",
    age: 45,
    gender: "Male",
    dob: "Jan 15, 1979",
    phone: "(555) 123-4567",
    email: "john.doe@email.com",
    address: "123 Main St, New York, NY 10001",
    bloodGroup: "O+",
  };

  const upcomingAppointments = [
    {
      id: 1,
      date: "Tomorrow",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      specialty: "General Physician",
      type: "Regular Checkup",
    },
    {
      id: 2,
      date: "Dec 28, 2024",
      time: "02:30 PM",
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      type: "Follow-up",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PageHero
        title={`Welcome back, ${authenticatedPatient.name}`}
        description="Here's your personal health dashboard"
        showStats
        stats={[
          {
            value: upcomingAppointments.length,
            label: "Upcoming Appointments",
          },
        ]}
      />
      <PatientInformation patient={authenticatedPatient} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingAppointments appointments={upcomingAppointments} />
      </div>
    </div>
  );
}
