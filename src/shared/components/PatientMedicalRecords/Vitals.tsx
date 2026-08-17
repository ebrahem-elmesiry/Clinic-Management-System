"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg text-gray-900">Latest Vitals</h3>
        {staff && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Record Vitals
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vitals.map((vital, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg"
          >
            <p className="text-sm text-gray-500 mb-2">{vital.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl text-gray-900">{vital.value}</p>
              <p className="text-sm text-gray-500">{vital.unit}</p>
            </div>
            <span
              className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                vital.status === "normal"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              Normal
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
