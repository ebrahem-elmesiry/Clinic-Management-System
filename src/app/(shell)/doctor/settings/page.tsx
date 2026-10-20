import SettingsPageWrapper from "@/shared/components/settings/SettingsPageWrapper";
import { UserRole } from "@/shared/types/type";

export default function Page() {
  const profile = {
    firstName: "Dr. Sarah Johnson",
    lastName: "Dr. Sarah Johnson",
    email: "sarah.johnson@clinic.com",
    specialty: "General Physician",
    role: "doctor" as UserRole,
  };

  return <SettingsPageWrapper profile={profile} />;
}
