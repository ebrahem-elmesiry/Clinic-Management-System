"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  DoctorFeeChange,
  OriginalValues,
  SpecialtyPrice,
  TypeRow,
} from "@/role/admin/types/doctorFees";
import { MESSAGES } from "@/role/admin/constants/messages";
import { DOCTOR_FEES_VALIDATION } from "@/role/admin/constants/doctorFees";
import { useAppointmentContext } from "@/shared/context/AppointmentContext";

export default function DoctorFeesHook() {
  const { doctorFees, setDoctorFees } = useAppointmentContext();

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
      doctor_name: row.doctor_name,
      specialty_id: row.specialty_id,
      price: row.price,
    };
    setDoctorFees((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const { is_new, ...row } = doc;
          return row;
        } else {
          return doc;
        }
      }),
    );
    setChanges((prev) => [...prev.filter((c) => c.id !== id), change]);
  }

  function updateRow(id: string, value: string, type: TypeRow) {
    if (type === "price" && Number(value) <= DOCTOR_FEES_VALIDATION.minPrice) {
      toast.info(DOCTOR_FEES_VALIDATION.priceLowMessage);
      return;
    }
    setDoctorFees((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [type]: value };
        return updated;
      }),
    );
  }

  function checkDocData(ID: string) {
    const getDoc: SpecialtyPrice = doctorFees.find((doc) => doc.id === ID);
    if (!getDoc?.doctor_name || !getDoc?.price || !getDoc?.specialty_id) {
      if (getDoc.price <= DOCTOR_FEES_VALIDATION.minPrice) {
        toast.info(DOCTOR_FEES_VALIDATION.priceLowMessage);
        return;
      }
      toast.info(MESSAGES.clinicSettings.doctorSpecialties.completeAdd);
      return false;
    }
    setEditingIds((prev) => prev.filter((e) => e !== ID));
    return true;
  }

  function handleAcceptNew(ID: string, row: SpecialtyPrice) {
    const check = checkDocData(ID);
    if (!check) return;
    upsertChange(ID, row);
    toast.success(MESSAGES.clinicSettings.doctorSpecialties.success);
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

  return {
    doctorFees,
    editingIds,
    changes,
    startEditing,
    cancelEditing,
    updateRow,
    addSpecialty,
    removeSpecialty,
    handleAcceptNew,
  };
}
