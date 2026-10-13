"use client";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";
import DoctorFeesHook from "../../hooks/DoctorFeesHook";
import { doctors, specialties } from "@/role/admin/constants/user-managment";

export default function DoctorFees() {
  const {
    doctorFees,
    editingIds,
    startEditing,
    cancelEditing,
    updatePrice,
    updateSpecialty,
    updateDoctor,
    addSpecialty,
    removeSpecialty,
    handleSave,
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

        {doctorFees.map((item) => {
          const isEditing = editingIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center border-t border-gray-100 dark:border-slate-700/50 py-2"
            >
              {isEditing ? (
                <>
                  {/* only get specialties that doesn't related to any doctor */}
                  <Select
                    value={item.specialty_id}
                    onValueChange={(value) => updateSpecialty(item.id, value)}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* only get doctors that doesn't related to any specialties */}
                  <Select
                    value={item.doctor_name}
                    onValueChange={(value) => updateDoctor(item.id, value)}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doc) => (
                        <SelectItem key={doc.id} value={doc.name}>
                          {doc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      updatePrice(item.id, Number(e.target.value))
                    }
                    className="h-9 w-28"
                  />

                  <div className="flex items-center justify-end gap-1">
                    {item.is_new ? (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAcceptNew(item.id)}
                          aria-label="Accept"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSpecialty(item.id)}
                          aria-label="Delete row"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => cancelEditing(item.id)}
                          aria-label="Cancel edit"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSpecialty(item.id)}
                          aria-label="Delete row"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Input
                    readOnly
                    value={
                      specialties.find((s) => s.id === item.specialty_id)
                        ?.name ?? ""
                    }
                    className="h-9"
                  />

                  <Input readOnly value={item.doctor_name} className="h-9" />

                  <Input
                    readOnly
                    value={`$${item.price}`}
                    className="h-9 w-28"
                  />

                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(item.id)}
                      aria-label="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSpecialty(item.id)}
                      aria-label="Delete row"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          );
        })}
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

      <div className="flex justify-end">
        <Button type="button" onClick={handleSave} className="mt-4">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
