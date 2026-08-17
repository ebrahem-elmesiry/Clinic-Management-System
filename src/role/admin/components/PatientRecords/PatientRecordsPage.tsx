"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import PageTitleWithButton from "@/shared/components/page-title/PageTitleWithButton";
import SelectedPatient from "@/shared/components/PatientRecords/SelectedPatient";
import PatientInformation from "@/shared/components/PatientRecords/PatientInformation";
import VisitHistory from "@/shared/components/PatientMedicalRecords/VisitHistory";
import Vitals from "@/shared/components/PatientMedicalRecords/Vitals";
import Prescriptions from "@/shared/components/PatientMedicalRecords/Prescriptions";

const patients = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "(555) 123-4567",
    lastVisit: "2 days ago",
  },
  {
    id: 2,
    name: "Emma Wilson",
    age: 32,
    gender: "Female",
    phone: "(555) 234-5678",
    lastVisit: "1 week ago",
  },
  {
    id: 3,
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    phone: "(555) 345-6789",
    lastVisit: "3 days ago",
  },
  {
    id: 4,
    name: "Sarah Davis",
    age: 28,
    gender: "Female",
    phone: "(555) 456-7890",
    lastVisit: "Today",
  },
];

const patientDetails = {
  id: 1,
  name: "John Smith",
  age: 45,
  gender: "Male",
  dob: "Jan 15, 1979",
  phone: "(555) 123-4567",
  email: "john.smith@email.com",
  address: "123 Main St, New York, NY 10001",
  bloodGroup: "O+",
  allergies: "Penicillin, Peanuts",
  emergencyContact: "Jane Smith - (555) 987-6543",
};

const visits = [
  {
    date: "Dec 20, 2024",
    doctor: "Dr. Sarah Johnson",
    reason: "Regular Checkup",
    diagnosis: "Stable condition, blood pressure normal",
    prescription: "Continue current medication",
    followUp: "None required",
  },
  {
    date: "Nov 15, 2024",
    doctor: "Dr. Michael Chen",
    reason: "Consultation - Chest Pain",
    diagnosis: "Anxiety-related chest pain, ECG normal",
    prescription: "Prescribed relaxation exercises",
    followUp: "2 weeks",
  },
  {
    date: "Oct 10, 2024",
    doctor: "Dr. Sarah Johnson",
    reason: "Blood Sugar Monitoring",
    diagnosis: "Blood sugar levels within target range",
    prescription: "Continue Metformin 500mg",
    followUp: "1 month",
  },
];

const vitals = [
  {
    label: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    status: "normal",
  },
  { label: "Heart Rate", value: "72", unit: "bpm", status: "normal" },
  { label: "Temperature", value: "98.6", unit: "°F", status: "normal" },
  { label: "Blood Sugar", value: "105", unit: "mg/dL", status: "normal" },
  { label: "Weight", value: "180", unit: "lbs", status: "normal" },
  { label: "Height", value: "5'10\"", unit: "", status: "normal" },
];

export default function PatientRecordsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(1);

  return (
    <div className="p-8 space-y-6">
      <PageTitleWithButton
        title="Patient Records"
        subtitle="View and manage patient medical information"
        action={
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Add New Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Smith" className="mt-2" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      placeholder="Male/Female"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blood">Blood Group</Label>
                    <Input id="blood" placeholder="O+" className="mt-2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="patient@email.com"
                      className="mt-2"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State ZIP"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    placeholder="Name - Phone Number"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Input
                    id="allergies"
                    placeholder="e.g., Penicillin, Peanuts"
                    className="mt-2"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Add Patient
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SelectedPatient
          patients={patients}
          selectedPatient={selectedPatient}
          onSelect={setSelectedPatient}
        />

        <div className="lg:col-span-3 space-y-6">
          <PatientInformation patient={patientDetails} />

          <Tabs defaultValue="visits" className="space-y-6">
            <TabsList className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <TabsTrigger value="visits">Visit History</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            </TabsList>

            <TabsContent value="visits" className="space-y-4">
              <VisitHistory visits={visits} staff />
            </TabsContent>

            <TabsContent value="vitals">
              <Vitals vitals={vitals} staff />
            </TabsContent>

            <TabsContent value="prescriptions">
              <Prescriptions staff />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
