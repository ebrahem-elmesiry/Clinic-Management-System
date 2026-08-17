"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";

interface Vital {
  label: string;
  value: string;
  unit: string;
  status: string;
}

interface VitalsProps {
  vitals: Vital[];
  staff?: boolean;
}

export default function Vitals({ vitals, staff = false }: VitalsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg text-gray-900 dark:text-gray-100">Latest Vitals</h3>
        {staff && (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Record Vitals
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vitals.map((vital, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{vital.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl text-gray-900 dark:text-gray-100">{vital.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{vital.unit}</p>
            </div>
            <div className="mt-2">
              <StatusBadge status={vital.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
