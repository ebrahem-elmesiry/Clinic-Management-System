"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
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

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  instructions: string;
}

const newMedicine = (): Medicine => ({
  id: Date.now(),
  name: "",
  dosage: "",
  frequency: "",
  timing: "",
  duration: "",
  instructions: "",
});

export default function MedicationsPrescription() {
  const [medicines, setMedicines] = React.useState<Medicine[]>([newMedicine()]);

  const addMedicine = () => {
    setMedicines((prev) => [...prev, newMedicine()]);
  };

  const removeMedicine = (id: number) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg text-gray-900 dark:text-slate-100">
          Medications & Prescription
        </h2>
        <Button onClick={addMedicine} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Medicine
        </Button>
      </div>

      <div className="space-y-4">
        {medicines.map((medicine, index) => (
          <div
            key={medicine.id}
            className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600 dark:text-slate-300">
                Medicine #{index + 1}
              </span>
              {medicines.length > 1 && (
                <button
                  onClick={() => removeMedicine(medicine.id)}
                  className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <Label htmlFor={`medicine-name-${medicine.id}`}>
                  Medicine Name
                </Label>
                <Input
                  id={`medicine-name-${medicine.id}`}
                  placeholder="e.g., Amoxicillin 500mg"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`dosage-${medicine.id}`}>Dosage</Label>
                <Input
                  id={`dosage-${medicine.id}`}
                  placeholder="e.g., 1 tablet"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`frequency-${medicine.id}`}>
                  Frequency
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once daily</SelectItem>
                    <SelectItem value="twice">Twice daily</SelectItem>
                    <SelectItem value="thrice">3 times daily</SelectItem>
                    <SelectItem value="four">4 times daily</SelectItem>
                    <SelectItem value="needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`timing-${medicine.id}`}>Timing</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="before">Before meals</SelectItem>
                    <SelectItem value="after">After meals</SelectItem>
                    <SelectItem value="with">With meals</SelectItem>
                    <SelectItem value="empty">Empty stomach</SelectItem>
                    <SelectItem value="anytime">Anytime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`duration-${medicine.id}`}>
                  Duration
                </Label>
                <Input
                  id={`duration-${medicine.id}`}
                  placeholder="e.g., 7 days"
                  className="mt-2"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor={`instructions-${medicine.id}`}>
                  Special Instructions
                </Label>
                <textarea
                  id={`instructions-${medicine.id}`}
                  rows={2}
                  placeholder="Any additional instructions..."
                  className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
