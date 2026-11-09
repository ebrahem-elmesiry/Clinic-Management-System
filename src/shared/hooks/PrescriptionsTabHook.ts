"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { PrescriptionFormData } from "@/role/doctor/modals/AddPrescription";
import { Prescription } from "@/shared/types/patientRecords";
import { prescriptions } from "@/shared/constants/patientRecords";
import { useAuth } from "@/providers/AuthProvider";
import { format } from "date-fns";

interface PrescriptionsTabHookProps {
  patientId: string | null;
}

export default function usePrescriptionsTabHook({
  patientId,
}: PrescriptionsTabHookProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const modal = searchParams.get("modal");
  const editingId = searchParams.get("prescriptionId");
  const isEdit = modal === "edit" && !!editingId;
  const open = modal === "add" || isEdit;

  const defaultForm: PrescriptionFormData = {
    medicineName: "",
    dosage: "",
    frequency: "",
    timing: "",
    duration: "",
    specialInstructions: "",
  };
  const [localPrescriptions, setLocalPrescriptions] =
    useState<Prescription[]>(prescriptions);

  const [form, setForm] = useState<PrescriptionFormData>(defaultForm);
  const handleChange = (field: keyof PrescriptionFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  function validate() {
    if (!form.medicineName.trim()) {
      toast.error("Medicine Name is required");
      return false;
    }
    return true;
  }
  const { role } = useAuth();
  const isDoctor = role === "doctor";

  function updateModalParams(next?: {
    modal: string;
    prescriptionId?: string;
  }) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    params.delete("prescriptionId");

    if (next) {
      params.set("modal", next.modal);
      if (next.prescriptionId) {
        params.set("prescriptionId", next.prescriptionId);
      }
    }

    const qs = params.toString();
    // Native replaceState avoids the Suspense re-render scroll reset that
    // router.replace causes on the patient-records page.
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  }

  function openAddPrescription() {
    setForm(defaultForm);
    updateModalParams({ modal: "add" });
  }

  function closePrescriptionModal() {
    setForm(defaultForm);
    updateModalParams();
  }

  function startEditPrescription(id: string) {
    const rx = localPrescriptions.find((p) => p.id === id);
    if (!rx) return;

    setForm({
      medicineName: rx.medicine,
      dosage: rx.dosage,
      frequency: rx.frequency,
      timing: rx.timing,
      duration: rx.duration,
      specialInstructions: rx.specialInstructions ?? "",
    });

    updateModalParams({ modal: "edit", prescriptionId: id });
  }

  const patientPrescriptions = localPrescriptions.filter(
    (p) => p.patientId === patientId,
  );

  function handlePrescriptionEdit(id: string) {
    setLocalPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...form } : p)),
    );
    toast.success("Prescription Edit successfully");
  }

  const emptyForm = () => setForm(defaultForm);

  const handleCreatePrescription = (data: {
    medicineName: string;
    dosage: string;
    frequency: string;
    timing: string;
    duration: string;
    specialInstructions?: string;
    notes?: string;
  }) => {
    const date = format(new Date(), "yyyy-MM-dd");
    if (!patientId) return;
    const newRx: Prescription = {
      id: `rx-${Date.now()}`,
      patientId: patientId,
      medicine: data.medicineName,
      dosage: data.dosage,
      frequency: data.frequency,
      timing: data.timing,
      duration: data.duration,
      specialInstructions: data.specialInstructions,
      status: "Active",
      prescribedBy: "Dr. Sarah Johnson",
      date: date,
      remainingDays: parseInt(data.duration, 10) || 0,
    };
    setLocalPrescriptions((prev) => [newRx, ...prev]);
    toast.success("Prescription created successfully");
  };

  function handleRevoke(id: string) {
    setLocalPrescriptions((prev) => prev.filter((p) => p.id !== id));
    toast.success("Prescription revoked");
  }
  const isPending = false;

  return {
    form,
    isEdit,
    editingId,
    open,
    isDoctor,
    patientPrescriptions,
    isPending,
    handleChange,
    validate,
    openAddPrescription,
    closePrescriptionModal,
    startEditPrescription,
    handlePrescriptionEdit,
    emptyForm,
    handleCreatePrescription,
    handleRevoke,
  };
}
