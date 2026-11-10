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
  { id: "1", specialty_id: "3", doctor_name: "Dr. Sarah Johnson", price: 150 },
  { id: "2", specialty_id: "2", doctor_name: "Dr. Michael Chen", price: 150 },
  { id: "3", specialty_id: "1", doctor_name: "Dr. Sarah Johnson", price: 150 },
  { id: "4", specialty_id: "4", doctor_name: "Dr. Robert Lee", price: 150 },
];
