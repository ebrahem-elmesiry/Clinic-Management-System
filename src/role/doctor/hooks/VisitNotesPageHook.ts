"use client";

import { useState } from "react";
import type { FollowUpAppointment, Medicine } from "../types/type";
import { CancellationState, VisitNotesState } from "../types/visit-notes";
import { toast } from "sonner";
import { Appointment } from "@/shared/types/appointment";

const newMedicine: Medicine = {
  id: crypto.randomUUID(),
  name: "",
  dosage: "",
  frequency: "",
  timing: "",
  duration: "",
  instructions: "",
};

const initialVisitNotes: VisitNotesState = {
  status: "pending",
  diagnosis: "",
  doctorNotes: "",
  followUp: false,
  nextAppointment: null,
};

const initialCancellation: CancellationState = {
  cancelReason: "",
  cancelNote: "",
};

export default function VisitNotesPageHook() {
  const [visitNotes, setVisitNotes] =
    useState<VisitNotesState>(initialVisitNotes);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [cancellation, setCancellation] =
    useState<CancellationState>(initialCancellation);

  function updateVisitNotes<K extends keyof VisitNotesState>(
    field: K,
    value: VisitNotesState[K],
  ) {
    setVisitNotes((prev) => ({ ...prev, [field]: value }));
  }

  function updateCancellation<K extends keyof CancellationState>(
    field: K,
    value: CancellationState[K],
  ) {
    setCancellation((prev) => ({ ...prev, [field]: value }));
  }

  function addMedicine() {
    setMedicines((prev) => [...prev, newMedicine]);
  }

  function removeMedicine(id: string) {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  }

  function updateMedicine(id: string, field: keyof Medicine, value: string) {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    );
  }

  function handleFollowUpNo() {
    setVisitNotes((prev) => ({
      ...prev,
      followUp: false,
      nextAppointment: null,
    }));
  }

  function handleScheduleFollowUp(data: FollowUpAppointment | null) {
    setVisitNotes((prev) => ({
      ...prev,
      nextAppointment: data,
    }));
  }
  function onStartSchedule() {
    setVisitNotes((prev) => ({
      ...prev,
      followUp: true,
    }));
  }
  function CompleteVisit() {
    // add visit-notes into database here
    if (visitNotes.followUp) {
      // add appointment if followUp is true
    }
    updateVisitNotes("status", "completed");
    toast.info("Visit has been Complete");
  }
  function ExportPDF() {
    toast.info("The PDF file is being created now.");
  }

  return {
    visitNotes,
    updateVisitNotes,
    cancellation,
    updateCancellation,
    medicines,
    addMedicine,
    removeMedicine,
    updateMedicine,
    handleFollowUpNo,
    onStartSchedule,
    handleScheduleFollowUp,
    ExportPDF,
    CompleteVisit,
  };
}
