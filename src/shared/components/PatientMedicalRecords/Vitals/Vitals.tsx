"use client";

import React from "react";
import { Plus, Activity } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";
import WrapperComponent from "../../WrapperComponent";
import EmptyVitals from "./EmptyVitals";

interface Vital {
  label: string;
  value: string;
  unit: string;
  status: string;
}

interface VitalsProps {
  vitals: Vital[];
  doctor?: boolean;
  onAddEdit?: () => void;
}

function isEmptyValue(value: string | null | undefined) {
  return !value || value.trim() === "" || value.trim() === "-";
}

export default function Vitals({
  vitals,
  doctor = false,
  onAddEdit,
}: VitalsProps) {
  const hasVitals = vitals && vitals.length > 0;
  return (
    <WrapperComponent
      title={"Latest Vitals"}
      showButton={doctor}
      Button={
        <Button onClick={onAddEdit}>
          <Plus className="w-4 h-4 mr-2" />
          Add/Edit Vitals
        </Button>
      }
    >
      {!hasVitals ? (
        <EmptyVitals doctor={doctor} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vitals.map((vital, index) => {
            const empty = isEmptyValue(vital.value);
            const displayValue = empty ? "—" : vital.value;
            const displayUnit = isEmptyValue(vital.unit) ? "" : vital.unit;
            const displayStatus = isEmptyValue(vital.status)
              ? "none"
              : vital.status;

            return (
              <div
                key={index}
                className={`p-4 border rounded-lg ${
                  empty
                    ? "border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }`}
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {vital.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <p
                    className={`text-2xl ${
                      empty
                        ? "text-gray-400 dark:text-gray-500"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {displayValue}
                  </p>
                  {displayUnit && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {displayUnit}
                    </p>
                  )}
                  {empty && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
                      Not recorded
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <StatusBadge status={displayStatus} />
                </div>
                {empty && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Value: None
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </WrapperComponent>
  );
}
