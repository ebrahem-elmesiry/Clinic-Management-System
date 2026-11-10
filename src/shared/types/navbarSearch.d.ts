export interface SearchPatient {
  id: string;
  name: string;
  age: number;
  image: string | undefined;
  url?: string;
}

export interface SearchDoctor {
  id: string;
  name: string;
  specialty: string;
  image: string | undefined;
  url?: string;
}

export interface SearchAppointment {
  id: string;
  patientName: string;
  date: string;
  doctorName: string;
  specialty: string;
  url?: string;
}

export interface NavbarSearchData {
  patients: SearchPatient[];
  doctors: SearchDoctor[];
  appointments: SearchAppointment[];
}

export interface AdminSearchData {
  patients: SearchPatient[];
  doctors: SearchDoctor[];
  appointments: SearchAppointment[];
}

export interface DoctorSearchData {
  patients: SearchPatient[];
  appointments: SearchAppointment[];
}

export interface PatientSearchData {
  appointments: SearchAppointment[];
}
