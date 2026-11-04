import PageHero from "@/shared/components/PageHero";
import PatientRecordsWrapper from "@/shared/components/PatientRecords/PatientRecordsWrapper";
import { Prescription } from "@/shared/types/patientRecords";
import { Gender, personalData, UserRole } from "@/shared/types/type";

const visits = [
  {
    patientId: "1",
    date: "Dec 20, 2024",
    doctor: "Dr. Sarah Johnson",
    reason: "Regular Checkup",
    diagnosis: "Stable condition, blood pressure normal",
    prescription: [
      {
        id: "pr-11",
        medicineName: "Lisinopril 10mg",
        dosage: "1 tablet",
        frequency: "Once daily",
        timing: "After meals",
        duration: "30 days",
        specialInstructions: "Continue current medication",
      },
    ],
    followUp: "None required",
  },
  {
    patientId: "1",
    date: "Nov 15, 2024",
    doctor: "Dr. Michael Chen",
    reason: "Consultation - Chest Pain",
    diagnosis: "Anxiety-related chest pain, ECG normal",
    prescription: [
      {
        id: "pr-10",
        medicineName: "Propranolol 10mg",
        dosage: "1 tablet",
        frequency: "As needed",
        timing: "Anytime",
        duration: "14 days",
        specialInstructions: "Prescribed relaxation exercises",
      },
    ],
    followUp: "2 weeks",
  },
  {
    patientId: "1",
    date: "Oct 10, 2024",
    doctor: "Dr. Sarah Johnson",
    reason: "Blood Sugar Monitoring",
    diagnosis: "Blood sugar levels within target range",
    prescription: [
      {
        id: "pr-13",
        medicineName: "Metformin 500mg",
        dosage: "1 tablet",
        frequency: "Twice daily",
        timing: "With meals",
        duration: "30 days",
      },
    ],
    followUp: "1 month",
  },
];

const vitals = [
  {
    patientId: "1",
    label: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    status: "normal",
  },
  {
    patientId: "1",
    label: "Heart Rate",
    value: "72",
    unit: "bpm",
    status: "normal",
  },
  {
    patientId: "1",
    label: "Temperature",
    value: "98.6",
    unit: "°F",
    status: "normal",
  },
  {
    patientId: "1",
    label: "Blood Sugar",
    value: "105",
    unit: "mg/dL",
    status: "normal",
  },
  {
    patientId: "1",
    label: "Weight",
    value: "180",
    unit: "lbs",
    status: "normal",
  },
  {
    patientId: "1",
    label: "Height",
    value: "5'10\"",
    unit: "",
    status: "normal",
  },
];

const prescriptions: Prescription[] = [
  {
    id: "rx-1",
    patientId: "1",
    medicine: "Amoxicillin 500mg",
    dosage: "1 tablet",
    frequency: "3 times daily",
    timing: "After meals",
    duration: "7 days",
    specialInstructions: "Take with plenty of water. Complete full course.",
    remainingDays: 7,
    prescribedBy: "Dr. Sarah Johnson",
    status: "Active",
    date: "Dec 20, 2024",
  },
];

export default function page() {
  const patient: personalData = {
    id: "patient_id",
    name: "Ahmed",
    gender: "Male" as Gender,
    age: 24,
    role: "patient" as UserRole,
    bloodGroup: "O+",
  };
  /*
    make condition here:
      1. if role is admin wait for patientId from url to make fetch.
      2. if role is patient make fetch instantly.
  */
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHero
        title="My Medical Records"
        description="View your personal health information"
      />

      <PatientRecordsWrapper
        patient={patient}
        vitals={vitals}
        visits={visits}
        prescriptions={prescriptions}
      />
    </div>
  );
}
