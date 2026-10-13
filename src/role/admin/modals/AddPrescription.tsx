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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Pill, Check } from "lucide-react";
import { toast } from "sonner";

export interface PrescriptionFormData {
  medicineName: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  specialInstructions?: string;
  notes?: string;
}

interface AddPrescriptionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
  patientMeta?: string;
  onCreate: (data: PrescriptionFormData & { date: string }) => void;
  onSaveDraft?: (data: PrescriptionFormData & { date: string }) => void;
}

const defaultForm: PrescriptionFormData = {
  medicineName: "",
  dosage: "",
  frequency: "",
  timing: "",
  duration: "",
  specialInstructions: "",
  notes: "",
};

export default function AddPrescription({
  open,
  onOpenChange,
  patientName,
  patientMeta,
  onCreate,
  onSaveDraft,
}: AddPrescriptionProps) {
  const [form, setForm] = useState<PrescriptionFormData>(defaultForm);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (open) {
      setForm(defaultForm);
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [open]);

  const handleChange = (field: keyof PrescriptionFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    if (!form.medicineName.trim()) {
      toast.error("Medicine Name is required");
      return false;
    }
    return true;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onCreate({ ...form, date });
    toast.success("Prescription created successfully");
    onOpenChange(false);
  };

  const handleDraft = () => {
    if (!validate()) return;
    onSaveDraft?.({ ...form, date });
    toast.success("Draft saved");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-900 dark:text-gray-100">
            Add Prescription
          </DialogTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {patientName} {patientMeta ? `· ${patientMeta}` : ""} · Admin
            creates on behalf
          </p>
        </DialogHeader>

        <form onSubmit={handleCreate} className="space-y-5 mt-2">
          {/* Patient + Date — 14f m-grid2 */}
          <div>
            <Label>Patient</Label>
            <div className="mt-2 flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100">
              <span>{patientName} — O+</span>
            </div>
          </div>

          {/* Medicine #1 — MVP single medicine */}
          <div className="space-y-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              <Pill className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              Medicine #1 — MVP single medicine
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="med-name">Medicine Name</Label>
                <Input
                  id="med-name"
                  placeholder="e.g., Amoxicillin 500mg"
                  className="mt-2"
                  value={form.medicineName}
                  onChange={(e) => handleChange("medicineName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  placeholder="1 tablet"
                  className="mt-2"
                  value={form.dosage}
                  onChange={(e) => handleChange("dosage", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={form.frequency}
                  onValueChange={(v) => handleChange("frequency", v)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Once daily">Once daily</SelectItem>
                    <SelectItem value="Twice daily">Twice daily</SelectItem>
                    <SelectItem value="3 times daily">3 times daily</SelectItem>
                    <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timing">Timing</Label>
                <Select
                  value={form.timing}
                  onValueChange={(v) => handleChange("timing", v)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Before meals">Before meals</SelectItem>
                    <SelectItem value="After meals">After meals</SelectItem>
                    <SelectItem value="With meals">With meals</SelectItem>
                    <SelectItem value="At bedtime">At bedtime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="7 days"
                  className="mt-2"
                  value={form.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="special">Special Instructions</Label>
              <textarea
                id="special"
                rows={2}
                className="w-full mt-2 px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Take with plenty of water. Complete full course..."
                value={form.specialInstructions}
                onChange={(e) =>
                  handleChange("specialInstructions", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes & Advice</Label>
            <textarea
              id="notes"
              rows={2}
              className="w-full mt-2 px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Follow-up in 1 week · Avoid alcohol..."
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleDraft}
            >
              Save as Draft
            </Button>
            <Button type="submit" className="flex-1">
              Create Prescription
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
