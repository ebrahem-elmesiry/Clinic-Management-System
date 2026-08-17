"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface PrescriptionsProps {
  staff?: boolean;
}

export default function Prescriptions({ staff = false }: PrescriptionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg text-gray-900">Current Prescriptions</h3>
        {staff && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Prescription
          </Button>
        )}
      </div>
      <p className="text-center text-gray-500 py-8">
        No active prescriptions
      </p>
    </div>
  );
}
