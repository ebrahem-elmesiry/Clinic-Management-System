"use client";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Clock, Stethoscope } from "lucide-react";

interface ClinicDetailsProps {
  clinicName: string;
  startTime: string;
  endTime: string;
  onClinicNameChange: (value: string) => void;
  setHandleTime: (type: "start" | "end", value: string) => void;
}

export default function ClinicDetails({
  clinicName,
  startTime,
  endTime,
  onClinicNameChange,
  setHandleTime,
}: ClinicDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="md:col-span-2">
        <Label htmlFor="clinicName">Clinic Name</Label>
        <div className="relative mt-2">
          <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <Input
            id="clinicName"
            value={clinicName}
            onChange={(e) => onClinicNameChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="startTime">Working Hours Start</Label>
        <div className="relative mt-2">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <Input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setHandleTime("start", e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="endTime">Working Hours End</Label>
        <div className="relative mt-2">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <Input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setHandleTime("end", e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
    </div>
  );
}
