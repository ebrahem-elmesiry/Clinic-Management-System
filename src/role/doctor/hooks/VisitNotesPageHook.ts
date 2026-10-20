"use client";

import { useState } from "react";
import type {
  FollowUpAppointment,
  Medicine,
  VisitStatusValue,
} from "../types/type";

const newMedicine = (): Medicine => ({
  id: Date.now(),
  name: "",
  dosage: "",
  frequency: "",
  timing: "",
  duration: "",
  instructions: "",
});

export default function VisitNotesPageHook() {
  const [status, setStatus] = useState<VisitStatusValue>("pending");
  const [cancelReason, setCancelReason] = useState("");
  const [cancelNote, setCancelNote] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([newMedicine()]);
  const [diagnosis, setDiagnosis] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");
  const [followUp, setFollowUp] = useState(false);
  const [nextAppointment, setNextAppointment] =
    useState<FollowUpAppointment | null>(null);

  function addMedicine() {
    setMedicines((prev) => [...prev, newMedicine()]);
  }

  function removeMedicine(id: number) {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  }

  function updateMedicine(id: number, field: keyof Medicine, value: string) {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    );
  }

  function handleFollowUpNo() {
    setFollowUp(false);
    setNextAppointment(null);
  }

  function handleScheduleFollowUp(data: FollowUpAppointment) {
    setNextAppointment(data);
    setFollowUp(true);
  }

  return {
    status,
    setStatus,
    cancelReason,
    setCancelReason,
    cancelNote,
    setCancelNote,
    medicines,
    addMedicine,
    removeMedicine,
    updateMedicine,
    diagnosis,
    setDiagnosis,
    doctorNotes,
    setDoctorNotes,
    followUp,
    nextAppointment,
    handleFollowUpNo,
    handleScheduleFollowUp,
  };
}
