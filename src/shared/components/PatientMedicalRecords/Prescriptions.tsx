"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface PrescriptionsProps {
  staff?: boolean;
}

export default function Prescriptions({ staff = false }: PrescriptionsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg text-gray-900 dark:text-gray-100">Current Prescriptions</h3>
        {staff && (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Prescription
          </Button>
        )}
      </div>
      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
        No active prescriptions
      </p>
    </div>
  );
}
