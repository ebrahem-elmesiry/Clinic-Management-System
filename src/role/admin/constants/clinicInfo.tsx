import { doctors } from "@/shared/constants/appointments";
import { SpecialtyPrice } from "../types/doctorFees";

export const WEEK_DAYS = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
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
