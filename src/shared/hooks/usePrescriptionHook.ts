"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Prescription } from "@/shared/types/patientRecords";
import { prescriptionSchema } from "@/role/doctor/validations/validation";

interface UsePrescriptionHookProps {
  prescriptions: Prescription[];
}

const defaultForm: Prescription = {
  id: "",
  patientId: "",
  medicine: "",
  dosage: "",
  frequency: "",
  timing: null,
  duration: "",
  specialInstructions: "",
  remainingDays: 0,
  prescribedBy: "",
  status: "active",
  date: "",
};

export default function usePrescriptionHook({
  prescriptions,
}: UsePrescriptionHookProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const modal = searchParams.get("prescription");
  const editingId = searchParams.get("prescriptionId");
  const isEdit = modal === "edit" && !!editingId;
  const prescriptionOpen = modal === "create" || isEdit;

  const [form, setForm] = useState<Prescription>(defaultForm);

  const handleChange = (field: keyof Prescription, value: string) =>
    setForm((prev) =>
      field === "remainingDays"
        ? { ...prev, remainingDays: Number(value) }
        : { ...prev, [field]: value },
    );

  function validate() {
    const validation = prescriptionSchema.safeParse(form);
    if (!validation.success) {
      toast.error(
        validation.error.issues[0]?.message ?? "Invalid prescription",
      );
      return false;
    }
    return true;
  }

  const emptyForm = () => setForm(defaultForm);

  function updateModalParams(next?: {
    modal: string;
    prescriptionId?: string;
  }) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("prescription");
    params.delete("prescriptionId");

    if (next) {
      params.set("prescription", next.modal);
      if (next.prescriptionId) {
        params.set("prescriptionId", next.prescriptionId);
      }
    }

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function openAddPrescription() {
    setForm(defaultForm);
    updateModalParams({ modal: "create" });
  }

  // 3- edit modal () => void (close + clear URL params)
  function closePrescriptionModal() {
    setForm(defaultForm);
    updateModalParams();
  }

  // 2- start edit (prefill form from the prescriptions prop)
  function startEditPrescription(id: string) {
    const rx = prescriptions.find((p) => p.id === id);
    if (!rx) return;

    setForm({ ...rx });

    updateModalParams({ modal: "edit", prescriptionId: id });
  }

  return {
    prescriptionOpen,
    isEdit,
    editingId,
    form,
    handleChange,
    validate,
    emptyForm,
    openAddPrescription,
    closePrescriptionModal,
    startEditPrescription,
  };
}
