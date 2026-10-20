"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { PrescriptionFormData } from "@/role/doctor/modals/AddPrescription";
import { PatientProfile, Prescription } from "@/shared/types/patientRecords";
import { prescriptions } from "@/shared/constants/patientRecords";
import { useAuth } from "@/providers/AuthProvider";
import { format } from "date-fns";

interface PrescriptionsTabHookProps {
  patient?: PatientProfile;
}

export default function usePrescriptionsTabHook({
  patient,
}: PrescriptionsTabHookProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const modal = searchParams.get("modal");
  const editingId = searchParams.get("prescriptionId");
  const isEdit = modal === "edit" && !!editingId;
  const prescriptionOpen = modal === "add" || isEdit;

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
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
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
      medicineName: rx.medicineName,
      dosage: rx.dosage,
      frequency: rx.frequency,
      timing: rx.timing,
      duration: rx.duration,
      specialInstructions: rx.specialInstructions ?? "",
    });

    updateModalParams({ modal: "edit", prescriptionId: id });
  }

  const patientPrescriptions = localPrescriptions.filter(
    (p) => p.patientId === patient?.id,
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
    if (!patient) return;
    const date = format(new Date(), "yyyy-MM-dd");
    const newRx: Prescription = {
      id: `rx-${Date.now()}`,
      patientId: patient.id,
      medicineName: data.medicineName,
      dosage: data.dosage,
      frequency: data.frequency,
      timing: data.timing,
      duration: data.duration,
      specialInstructions: data.specialInstructions,
      status: "Active",
      prescribedBy: "Dr. Sarah Johnson",
      date: date,
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
    prescriptionOpen,
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
