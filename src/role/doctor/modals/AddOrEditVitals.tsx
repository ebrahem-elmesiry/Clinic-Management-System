"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { toast } from "sonner";
import {
  VitalsFormData,
  vitalsSchema,
} from "@/role/doctor/validations/validation";

// Suggested better name: RecordVitalsModal — kept as AddOrEditVitals per your request
// If you prefer, rename file to RecordVitalsModal.tsx and keep this as wrapper export.

interface AddOrEditVitalsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
  patientMeta?: string;
  initialData: VitalsFormData;
  onSave: (data: VitalsFormData) => void;
  isEdit?: boolean;
}

const defaultData: VitalsFormData = {
  bloodPressure: "",
  heartRate: "",
  temperature: "",
  bloodSugar: "",
  weight: "",
  height: "",
};

export default function AddOrEditVitals({
  open,
  onOpenChange,
  patientName,
  patientMeta,
  initialData,
  onSave,
  isEdit = false,
}: AddOrEditVitalsProps) {
  const [form, setForm] = useState<VitalsFormData>(initialData ?? defaultData);

  const handleChange = (field: keyof VitalsFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = vitalsSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    onSave(result.data as VitalsFormData);
    toast.success(
      isEdit ? "Vitals updated successfully" : "Vitals recorded successfully",
    );
    onOpenChange(false);
  };

  const dateStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-900 dark:text-gray-100">
            {isEdit ? "Edit Vitals" : "Record Vitals"}
          </DialogTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {patientName} {patientMeta ? `· ${patientMeta}` : ""} · {dateStr}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bp">Blood Pressure (mmHg)</Label>
              <Input
                id="bp"
                placeholder="e.g., 120/80"
                className="mt-2"
                value={form.bloodPressure}
                onChange={(e) => handleChange("bloodPressure", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="hr">Heart Rate (bpm)</Label>
              <Input
                id="hr"
                placeholder="e.g., 72"
                className="mt-2"
                value={form.heartRate}
                onChange={(e) => handleChange("heartRate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="temp">Temperature (°F)</Label>
              <Input
                id="temp"
                placeholder="e.g., 98.6"
                className="mt-2"
                value={form.temperature}
                onChange={(e) => handleChange("temperature", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="sugar">Blood Sugar (mg/dL)</Label>
              <Input
                id="sugar"
                placeholder="e.g., 105"
                className="mt-2"
                value={form.bloodSugar}
                onChange={(e) => handleChange("bloodSugar", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                placeholder="e.g., 180"
                className="mt-2"
                value={form.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                placeholder="e.g., 5'10&quot;"
                className="mt-2"
                value={form.height}
                onChange={(e) => handleChange("height", e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {isEdit ? "Update Vitals" : "Save Vitals"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
