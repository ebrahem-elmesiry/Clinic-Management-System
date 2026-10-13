"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  DoctorFeeChange,
  OriginalValues,
  SpecialtyPrice,
} from "@/role/admin/types/settings";
import { doctors } from "@/role/admin/constants/user-managment";
import { MESSAGES } from "@/role/admin/constants/messages";

const doctorsWithSpecialty: SpecialtyPrice[] = [
  { id: "1", specialty_id: "3", doctor_name: "Dr. Sarah Johnson", price: 150 },
  { id: "2", specialty_id: "2", doctor_name: "Dr. Michael Chen", price: 150 },
  { id: "3", specialty_id: "1", doctor_name: "Dr. Sarah Johnson", price: 150 },
  { id: "4", specialty_id: "4", doctor_name: "Dr. Robert Lee", price: 150 },
];

export default function DoctorFeesHook() {
  const [doctorFees, setDoctorFees] =
    useState<SpecialtyPrice[]>(doctorsWithSpecialty);

  // ---- Edit Mode State: rows currently editable (multiple allowed) ----
  const [editingIds, setEditingIds] = useState<string[]>([]);

  // ---- Original Values State: snapshot per edited row, for Cancel restore ----
  const [originalValues, setOriginalValues] = useState<
    Record<string, OriginalValues>
  >({});

  // ---- Changes State: only rows actually modified, ready to be saved ----
  const [changes, setChanges] = useState<DoctorFeeChange[]>([]);
  function enterEdit(id: string, original: OriginalValues) {
    setOriginalValues((prev) => ({ ...prev, [id]: original }));
    setEditingIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function startEditing(id: string) {
    const row = doctorFees.find((d) => d.id === id);
    if (!row) return;
    enterEdit(id, {
      specialty_id: row.specialty_id,
      doctor_name: row.doctor_name,
      price: row.price,
    });
  }

  function cancelEditing(id: string) {
    const original = originalValues[id];
    if (original) {
      setDoctorFees((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...original } : item)),
      );
    }
    setOriginalValues((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
    setEditingIds((prev) => prev.filter((e) => e !== id));
    setChanges((prev) => prev.filter((c) => c.id !== id));
  }

  // FUTURE BACKEND:
  // When Save is triggered, the collected `changes` will be sent in a single request.
  // The backend will, for each change:
  //   1. Find the doctor using `doctor_id`.
  //   2. Update that doctor's `specialty_id` to the selected specialty.
  // This is frontend/mock-only for now — no API/database call is made.
  function upsertChange(id: string, row: SpecialtyPrice) {
    const change: DoctorFeeChange = {
      id,
      doctor_id: doctors.find((d) => d.name === row.doctor_name)?.id ?? "",
      specialty_id: row.specialty_id,
      price: row.price,
    };
    setChanges((prev) => [...prev.filter((c) => c.id !== id), change]);
  }

  function updatePrice(id: string, value: number) {
    setDoctorFees((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, price: value };
        upsertChange(id, updated);
        return updated;
      }),
    );
  }

  function updateSpecialty(id: string, value: string) {
    setDoctorFees((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, specialty_id: value };
        upsertChange(id, updated);
        return updated;
      }),
    );
  }

  function updateDoctor(id: string, value: string) {
    setDoctorFees((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, doctor_name: value };
        upsertChange(id, updated);
        return updated;
      }),
    );
  }

  function checkDocData(ID: string) {
    const getDoc = doctorFees.find((doc) => doc.id === ID);
    if (!getDoc?.doctor_name || !getDoc?.price || !getDoc?.specialty_id) {
      toast.info(MESSAGES.clinicSettings.doctorSpecialties.completeAdd);
      return false;
    }
    setEditingIds((prev) => prev.filter((e) => e !== ID));
    return true;
  }

  function handleAcceptNew(ID: string) {
    const check = checkDocData(ID);
    if (!check) return;
    setDoctorFees((prev) =>
      prev.map((doc) => {
        if (doc.id === ID) {
          const { is_new, ...updatedDoc } = doc;
          return updatedDoc;
        } else {
          return doc;
        }
      }),
    );
  }

  function addSpecialty() {
    const id = crypto.randomUUID();
    setDoctorFees((prev) => [
      ...prev,
      { id, specialty_id: "", doctor_name: "", price: 0, is_new: true },
    ]);
    enterEdit(id, { specialty_id: "", doctor_name: "", price: 0 });
  }

  function removeSpecialty(id: string) {
    setDoctorFees((prev) => prev.filter((item) => item.id !== id));
    setEditingIds((prev) => prev.filter((e) => e !== id));
    setOriginalValues((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
    setChanges((prev) => prev.filter((c) => c.id !== id));
  }

  // Mock save — no backend. Later this sends `changes` to the backend.
  function handleSave() {
    if (editingIds.length > 0) {
      toast.info(MESSAGES.clinicSettings.doctorSpecialties.completeAdd);
      return;
    }
    toast.success(MESSAGES.clinicSettings.doctorSpecialties.success);
    setEditingIds([]);
    setOriginalValues({});
    setChanges([]);
  }

  return {
    doctorFees,
    editingIds,
    changes,
    startEditing,
    cancelEditing,
    updatePrice,
    updateSpecialty,
    updateDoctor,
    addSpecialty,
    removeSpecialty,
    handleSave,
    handleAcceptNew,
  };
}
