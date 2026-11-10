export type UserRole = "doctor" | "admin" | "patient";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export type Profile = doctorProfile | patientProfile | adminProfile;
export type Gender = "Male" | "Female";

export type patientData = {
  id: string;
  name: string;
  role: UserRole;
  gender: Gender;
  age: number;
  bloodGroup: string;
};

interface sharedProfileData {
  id: string;
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
  gender: Gender;
  age: number;
} & sharedProfileData;

export type adminProfile = {
  email: string;
} & sharedProfileData;
