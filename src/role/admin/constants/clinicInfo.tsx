import { doctors } from "@/shared/constants/appointments";
import { SpecialtyPrice } from "../types/doctorFees";

export const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const doctorsWithSpecialty: SpecialtyPrice[] = [
  {
    id: "1",
    specialty_id: doctors[2].specialty_id,
    doctor_name: doctors[2].name,
    price: 150,
  },
  {
    id: "2",
    specialty_id: doctors[1].specialty_id,
    doctor_name: doctors[1].name,
    price: 150,
  },
  {
    id: "3",
    specialty_id: doctors[0].specialty_id,
    doctor_name: doctors[0].name,
    price: 150,
  },
];
