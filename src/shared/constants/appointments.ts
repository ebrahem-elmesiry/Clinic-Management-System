import {
  Appointment,
  AppointmentMonth,
  Doctor,
  Specialty,
} from "../types/appointments";

export const APPOINTMENT_STATUSES = [
  "confirmed",
  "pending",
  "completed",
  "cancelled",
] as const;

export const doctorsFilter = [
  {
    id: "d1",
    name: "Dr. Ahmed Hassan",
    label: "dr-ahmed-hassan",
  },
  {
    id: "d2",
    name: "Dr. Mohamed Ali",
    label: "dr-mohamed-ali",
  },
  {
    id: "d3",
    name: "Dr. Omar Khaled",
    label: "dr-omar-khaled",
  },
];
export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Ahmed Hassan",
    email: "ahmed@example.com",
    phone: "01012345678",
    specialty_id: "s1",
    specialty_name: "General Physician",
  },
  {
    id: "d2",
    name: "Dr. Mohamed Ali",
    email: "mohamed@example.com",
    phone: "01123456789",
    specialty_id: "s2",
    specialty_name: "Cardiologist",
  },
  {
    id: "d3",
    name: "Dr. Omar Khaled",
    email: "omar@example.com",
    phone: "01234567890",
    specialty_id: "s3",
    specialty_name: "Dermatologist",
  },
];

export const specialties: Specialty[] = [
  {
    id: "s1",
    name: "General Physician",
    doctor_id: "d1",
    price: 300,
  },
  {
    id: "s2",
    name: "Cardiologist",
    doctor_id: "d2",
    price: 500,
  },
  {
    id: "s3",
    name: "Dermatologist",
    doctor_id: "d3",
    price: 400,
  },
];

const appointmentsOct2026: Appointment[] = [
  {
    id: "a1",
    date: "2026-10-05",
    start_time: "09:00",
    end_time: "09:30",
    status: "confirmed",
    reason: "Follow-up",
    patient: { id: "1", name: "John Smith", age: 45, gender: "Male" },
    doctor: doctors[0],
    clinic_id: "c1",
  },
  {
    id: "a2",
    date: "2026-10-05",
    start_time: "10:00",
    end_time: "10:30",
    status: "confirmed",
    reason: "Headache",
    patient: { id: "2", name: "Emily Johnson", age: 32, gender: "Female" },
    doctor: doctors[1],
    clinic_id: "c1",
  },
  {
    id: "a3",
    date: "2026-10-08",
    start_time: "11:00",
    end_time: "11:30",
    status: "pending",
    reason: "Check-up",
    patient: { id: "3", name: "Michael Davis", age: 52, gender: "Male" },
    doctor: doctors[0],
    clinic_id: "c1",
  },
];

export const appointmentsNov2026: Appointment[] = [
  {
    id: "b1",
    date: "2026-11-03",
    start_time: "09:30",
    end_time: "10:00",
    status: "confirmed",
    reason: "Consultation",
    patient: { id: "4", name: "Olivia Brown", age: 27, gender: "Female" },
    doctor: doctors[2],
    clinic_id: "c1",
  },
  {
    id: "b2",
    date: "2026-11-10",
    start_time: "14:00",
    end_time: "14:30",
    status: "pending",
    reason: "Follow-up",
    patient: { id: "5", name: "David Wilson", age: 40, gender: "Male" },
    doctor: doctors[1],
    clinic_id: "c1",
  },
];

const appointmentsDec2026: Appointment[] = [
  {
    id: "c1",
    date: "2026-12-05",
    start_time: "08:30",
    end_time: "09:00",
    status: "completed",
    reason: "Regular Checkup",
    patient: { id: "6", name: "Sarah Miller", age: 36, gender: "Female" },
    doctor: doctors[0],
    clinic_id: "c1",
  },
];

export const appointmentsMonth: AppointmentMonth[] = [
  {
    start: "2026-10-01",
    end: "2026-10-31",
    appointments: appointmentsOct2026,
  },
  {
    start: "2026-11-01",
    end: "2026-11-30",
    appointments: appointmentsNov2026,
  },
  {
    start: "2026-12-01",
    end: "2026-12-31",
    appointments: appointmentsDec2026,
  },
];

export const busySchedule = [
  {
    day: "2026-10-05",
    times: [
      { start: "09:00", end: "09:30" },
      { start: "10:00", end: "10:30" },
      { start: "14:00", end: "14:30" },
    ],
  },
  {
    day: "2026-10-08",
    times: [
      { start: "08:30", end: "09:00" },
      { start: "11:00", end: "11:30" },
      { start: "13:00", end: "13:30" },
    ],
  },
  {
    day: "2026-10-12",
    times: [
      { start: "09:30", end: "10:00" },
      { start: "12:00", end: "12:30" },
    ],
  },
  {
    day: "2026-10-15",
    times: [
      { start: "10:00", end: "10:30" },
      { start: "11:30", end: "12:00" },
      { start: "15:00", end: "15:30" },
    ],
  },
  {
    day: "2026-10-20",
    times: [
      { start: "08:00", end: "08:30" },
      { start: "09:00", end: "09:30" },
      { start: "13:30", end: "14:00" },
    ],
  },
  {
    day: "2026-10-25",
    times: [
      { start: "10:30", end: "11:00" },
      { start: "12:30", end: "13:00" },
    ],
  },
  {
    day: "2026-10-27",
    times: [
      { start: "09:00", end: "09:30" },
      { start: "11:00", end: "11:30" },
      { start: "14:30", end: "15:00" },
    ],
  },
];
