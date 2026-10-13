export type Role = "doctor" | "admin" | "patient";

export interface commonUserData {
  id: string;
  name: string;
  role: Role;
  joinDate: string;
}

export interface adminRecord extends commonUserData {
  email: string;
}
export interface doctorRecord extends adminRecord {
  specialty: string;
  patients: number;
}
export interface patientRecord extends commonUserData {
  phone: string;
}

export type UserRecord = adminRecord | doctorRecord | patientRecord;
