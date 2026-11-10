import {
  AdminSearchData,
  DoctorSearchData,
  PatientSearchData,
} from "@/shared/types/navbarSearch";
import { doctors } from "./appointments";

export const adminSearchData: AdminSearchData = {
  patients: [
    {
      id: "p-1",
      name: "John Smith",
      age: 45,
      image: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: "p-2",
      name: "Emma Wilson",
      age: 32,
      image: "https://i.pravatar.cc/100?img=45",
    },
    {
      id: "p-3",
      name: "Michael Brown",
      age: 58,
      image: "https://i.pravatar.cc/100?img=33",
    },
  ],
  doctors: [
    {
      id: "d-1",
      name: doctors[0].name,
      specialty: doctors[0].specialty_name,
      image: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: "d-2",
      name: doctors[1].name,
      specialty: doctors[1].specialty_name,
      image: "https://i.pravatar.cc/100?img=8",
    },
    {
      id: "d-3",
      name: doctors[2].name,
      specialty: doctors[2].specialty_name,
      image: "https://i.pravatar.cc/100?img=14",
    },
  ],
  appointments: [
    {
      id: "a-1",
      patientName: "John Smith",
      date: "Dec 20, 2026",
      doctorName: doctors[0].name,
      specialty: doctors[0].specialty_name,
    },
    {
      id: "a-2",
      patientName: "Emma Wilson",
      date: "Dec 22, 2026",
      doctorName: doctors[1].name,
      specialty: doctors[1].specialty_name,
    },
    {
      id: "a-3",
      patientName: "Michael Brown",
      date: "Dec 24, 2026",
      doctorName: doctors[2].name,
      specialty: doctors[2].specialty_name,
    },
  ],
};

export const doctorSearchData: DoctorSearchData = {
  patients: [
    {
      id: "p-1",
      name: "John Smith",
      age: 45,
      image: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: "p-2",
      name: "Emma Wilson",
      age: 32,
      image: "https://i.pravatar.cc/100?img=45",
    },
    {
      id: "p-4",
      name: "Sarah Davis",
      age: 28,
      image: "https://i.pravatar.cc/100?img=20",
    },
  ],
  appointments: [
    {
      id: "a-1",
      patientName: "John Smith",
      date: "Dec 20, 2026",
      doctorName: doctors[0].name,
      specialty: doctors[0].specialty_name,
    },
    {
      id: "a-2",
      patientName: "Emma Wilson",
      date: "Dec 22, 2026",
      doctorName: doctors[1].name,
      specialty: doctors[1].specialty_name,
    },
    {
      id: "a-4",
      patientName: "Sarah Davis",
      date: "Dec 26, 2026",
      doctorName: doctors[2].name,
      specialty: doctors[2].specialty_name,
    },
  ],
};

export const patientSearchData: PatientSearchData = {
  appointments: [
    {
      id: "a-5",
      patientName: "John Doe",
      date: "Dec 20, 2026",
      doctorName: doctors[0].name,
      specialty: doctors[0].specialty_name,
    },
    {
      id: "a-6",
      patientName: "John Doe",
      date: "Jan 05, 2027",
      doctorName: doctors[1].name,
      specialty: doctors[1].specialty_name,
    },
    {
      id: "a-7",
      patientName: "John Doe",
      date: "Feb 11, 2027",
      doctorName: doctors[2].name,
      specialty: doctors[2].specialty_name,
    },
  ],
};
