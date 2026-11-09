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
  { id: "1", specialty_id: "3", doctor_name: "Dr. Sarah Johnson", price: 150 },
  { id: "2", specialty_id: "2", doctor_name: "Dr. Michael Chen", price: 150 },
  { id: "3", specialty_id: "1", doctor_name: "Dr. Sarah Johnson", price: 150 },
  { id: "4", specialty_id: "4", doctor_name: "Dr. Robert Lee", price: 150 },
];
