"use client";

import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import DoctorFeesHook from "../../../hooks/DoctorFeesHook";
import { doctors, specialties } from "@/shared/constants/appointments";
import DoctorFeeRow from "./DoctorFeeRow";

export default function DoctorFees() {
  const {
    doctorFees,
    editingIds,
    startEditing,
    cancelEditing,
    updateRow,
    addSpecialty,
    removeSpecialty,
    handleAcceptNew,
  } = DoctorFeesHook();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-lg text-gray-900 dark:text-slate-100 mb-6">
        Doctor Fees
      </h2>

      <Label className="mb-3 block">Consultation Fees by Specialty ($)</Label>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_7rem_auto] gap-2 text-xs text-gray-500 dark:text-slate-400 pb-2">
          <div>Specialty</div>
          <div>Doctor</div>
          <div>Fee ($)</div>
          <div className="text-right">Actions</div>
        </div>

        {doctorFees.map((item) => (
          <DoctorFeeRow
            key={item.id}
            item={item}
            isEditing={editingIds.includes(item.id)}
            specialties={specialties}
            doctors={doctors}
            onStartEditing={startEditing}
            onCancelEditing={cancelEditing}
            updateRow={updateRow}
            onRemoveSpecialty={removeSpecialty}
            onAcceptNew={handleAcceptNew}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addSpecialty}
        className="mt-4"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Specialty
      </Button>

      {/* <div className="flex justify-end">
        <Button type="button" onClick={handleSave} className="mt-4">
          Save Changes
        </Button>
      </div> */}
    </div>
  );
}
