"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { toast } from "sonner";
import PageTitleWithButton from "@/shared/components/page-title/PageTitleWithButton";
import TableSearch from "@/shared/components/TableSearch";
import AppointmentCalendar from "@/shared/components/Appointments/AppointmentCalendar";
import AppointmentTable from "@/shared/components/Tables/AppointmentTable";
import type { CalendarAppointment } from "@/shared/components/Appointments/AppointmentCalendar";

const allAppointments: CalendarAppointment[] = [
  {
    id: 1,
    patientId: "patient_001",
    time: "09:00 AM",
    patient: "John Smith",
    doctor: "Dr. Sarah Johnson",
    type: "Checkup",
    status: "confirmed",
    date: "2024-12-25",
  },
  {
    id: 2,
    patientId: "patient_002",
    time: "09:30 AM",
    patient: "Emma Wilson",
    doctor: "Dr. Michael Chen",
    type: "Follow-up",
    status: "pending",
    date: "2024-12-25",
  },
  {
    id: 3,
    patientId: "patient_003",
    time: "10:00 AM",
    patient: "James Brown",
    doctor: "Dr. Sarah Johnson",
    type: "Consultation",
    status: "confirmed",
    date: "2024-12-25",
  },
  {
    id: 4,
    patientId: "patient_004",
    time: "10:30 AM",
    patient: "Lisa Anderson",
    doctor: "Dr. Robert Lee",
    type: "Lab Review",
    status: "completed",
    date: "2024-12-25",
  },
  {
    id: 5,
    patientId: "patient_005",
    time: "11:00 AM",
    patient: "Michael Davis",
    doctor: "Dr. Sarah Johnson",
    type: "Checkup",
    status: "cancelled",
    date: "2024-12-25",
  },
  {
    id: 6,
    patientId: "patient_006",
    time: "02:00 PM",
    patient: "Sarah Miller",
    doctor: "Dr. Michael Chen",
    type: "Consultation",
    status: "confirmed",
    date: "2024-12-25",
  },
  {
    id: 7,
    patientId: "patient_001",
    time: "02:30 PM",
    patient: "John Smith",
    doctor: "Dr. Michael Chen",
    type: "Follow-up",
    status: "completed",
    date: "2024-12-22",
  },
  {
    id: 8,
    patientId: "patient_001",
    time: "10:00 AM",
    patient: "John Smith",
    doctor: "Dr. Sarah Johnson",
    type: "Checkup",
    status: "cancelled",
    date: "2024-12-10",
  },
];

export default function AppointmentsPage() {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddDialog(false);
    toast.success("Appointment scheduled successfully.");
  };

  const handleEdit = () => toast.info("Edit appointment — coming soon.");
  const handleCancel = () => toast.error("Appointment cancelled.");

  return (
    <div className="p-8 space-y-6">
      <PageTitleWithButton
        title="Appointments Management"
        subtitle="Schedule and manage appointments"
        action={
          <>
            {/* View toggle */}
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
              <button
                onClick={() => setView("calendar")}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  view === "calendar"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  view === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                List
              </button>
            </div>

            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-5 h-5 mr-2" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSchedule} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="patient">Patient Name</Label>
                    <Input
                      id="patient"
                      placeholder="Select or search patient"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-johnson">
                          Dr. Sarah Johnson
                        </SelectItem>
                        <SelectItem value="dr-chen">Dr. Michael Chen</SelectItem>
                        <SelectItem value="dr-lee">Dr. Robert Lee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="type">Appointment Type</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checkup">Regular Checkup</SelectItem>
                        <SelectItem value="followup">Follow-up</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <textarea
                      id="notes"
                      rows={3}
                      className="w-full mt-2 px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Add any additional notes..."
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
                    <Button
                      type="submit"
                      className="flex-1"
                    >
                      Schedule
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </>
        }
      />

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <TableSearch placeholder="Search appointments..." />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Doctors</SelectItem>
              <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
              <SelectItem value="dr-chen">Dr. Michael Chen</SelectItem>
              <SelectItem value="dr-lee">Dr. Robert Lee</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Calendar View */}
      {view === "calendar" && <AppointmentCalendar appointments={allAppointments} />}

      {/* List View */}
      {view === "list" && (
        <AppointmentTable
          appointments={allAppointments}
          onEdit={handleEdit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
