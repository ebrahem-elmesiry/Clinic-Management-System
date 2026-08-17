"use client";

import React from "react";
import Welcome from "@/role/patient/components/dashboard/Welcome";
import PatientInformation from "@/role/patient/components/dashboard/PatientInformation";
import UpcomingAppointments from "@/role/patient/components/dashboard/UpcomingAppointments";
import RecentVisits from "@/role/patient/components/dashboard/RecentVisits";
import ActivePrescriptions from "@/role/patient/components/dashboard/ActivePrescriptions";
import EmergencyContact from "@/role/patient/components/dashboard/EmergencyContact";
import HealthTip from "@/role/patient/components/dashboard/HealthTip";
import PrivacyNotice from "@/role/patient/components/dashboard/PrivacyNotice";
import MedicalHistory from "@/shared/components/PatientMedicalRecords/MedicalHistory";

// This would come from your authentication context/hook in a real application
// Example: const { user } = useAuth() or from session token
const AUTHENTICATED_PATIENT_ID = 'patient_12345'; // This represents the logged-in patient's ID

export default function PatientDashboard() {
  const authenticatedPatient = {
    id: AUTHENTICATED_PATIENT_ID,
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    dob: 'Jan 15, 1979',
    phone: '(555) 123-4567',
    email: 'john.doe@email.com',
    address: '123 Main St, New York, NY 10001',
    bloodGroup: 'O+',
    emergencyContact: 'Jane Doe - (555) 987-6543',
  };

  const upcomingAppointments = [
    {
      id: 1,
      date: 'Tomorrow',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      type: 'Regular Checkup',
      location: 'Room 205',
    },
    {
      id: 2,
      date: 'Dec 28, 2024',
      time: '02:30 PM',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      type: 'Follow-up',
      location: 'Cardiology Wing',
    },
  ];

  const activePrescriptions = [
    {
      id: 1,
      medicine: 'Amoxicillin 500mg',
      dosage: '1 tablet',
      frequency: '3 times daily',
      timing: 'After meals',
      duration: '7 days',
      startDate: 'Dec 18, 2024',
      remainingDays: 5,
      prescribedBy: 'Dr. Sarah Johnson',
      instructions: 'Complete the full course even if symptoms improve',
    },
    {
      id: 2,
      medicine: 'Vitamin D3 2000 IU',
      dosage: '1 tablet',
      frequency: 'Once daily',
      timing: 'Morning with breakfast',
      duration: '30 days',
      startDate: 'Dec 1, 2024',
      remainingDays: 22,
      prescribedBy: 'Dr. Sarah Johnson',
      instructions: 'Take with food for better absorption',
    },
  ];

  const medicalHistory = [
    {
      id: 1,
      condition: 'Hypertension',
      diagnosedDate: 'Mar 15, 2020',
      status: 'Controlled',
      severity: 'Moderate',
      notes: 'Blood pressure controlled with medication',
    },
    {
      id: 2,
      condition: 'Type 2 Diabetes',
      diagnosedDate: 'Nov 20, 2019',
      status: 'Controlled',
      severity: 'Mild',
      notes: 'Managed with Metformin and diet control',
    },
    {
      id: 3,
      condition: 'Seasonal Allergies',
      diagnosedDate: 'May 10, 2015',
      status: 'Recurring',
      severity: 'Mild',
      notes: 'Spring pollen allergies, manageable with antihistamines',
    },
  ];

  const recentVisits = [
    {
      id: 1,
      date: 'Dec 20, 2024',
      doctor: 'Dr. Sarah Johnson',
      reason: 'Regular Checkup',
      diagnosis: 'Stable condition, all vitals normal',
      notes: 'Continue current medications',
    },
    {
      id: 2,
      date: 'Nov 15, 2024',
      doctor: 'Dr. Michael Chen',
      reason: 'Cardiology Follow-up',
      diagnosis: 'Heart rate and blood pressure within normal range',
      notes: 'Schedule next follow-up in 3 months',
    },
  ];

  const healthStats = {
    upcomingAppointments: upcomingAppointments.length,
    activePrescriptions: activePrescriptions.length,
    medicalConditions: medicalHistory.filter(
      (h) => h.status === 'Controlled' || h.status === 'Ongoing'
    ).length,
    lastVisit: recentVisits[0]?.date || 'N/A',
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <Welcome patientName={authenticatedPatient.name} stats={healthStats} />

      <PatientInformation patient={authenticatedPatient} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UpcomingAppointments appointments={upcomingAppointments} />
          <MedicalHistory conditions={medicalHistory} />
          <RecentVisits visits={recentVisits} />
        </div>

        <div className="space-y-6">
          <ActivePrescriptions prescriptions={activePrescriptions} />
          <EmergencyContact emergencyContact={authenticatedPatient.emergencyContact} />
          <HealthTip />
        </div>
      </div>

      <PrivacyNotice patientId={authenticatedPatient.id} />
    </div>
  );
}
