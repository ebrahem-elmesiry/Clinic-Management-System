export type UserRole = "doctor" | "admin" | "patient";

export type Profile = doctorProfile | patientProfile | adminProfile;

interface sharedProfileData {
  firstName: string;
  lastName: string;
  role: UserRole;
}
export type doctorProfile = {
  email: string;
  specialty: string;
} & sharedProfileData;

export type patientProfile = {
  phone: string;
  date: string;
  blood: string;
  address: string;
} & sharedProfileData;

export type adminProfile = {
  email: string;
} & sharedProfileData;
