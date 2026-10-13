"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MESSAGES } from "@/role/admin/constants/messages";

interface ClinicInfoHookProps {
  defaultWorkingDays: string[];
  defaultDuration: string;
  defaultBufferTime: string;
  defaultTime: { start: string; end: string };
}

export default function ClinicInfoHook({
  defaultWorkingDays,
  defaultDuration,
  defaultBufferTime,
  defaultTime,
}: ClinicInfoHookProps) {
  const [clinicName, setClinicName] = useState("HealthCare Clinic");
  const [time, setTime] = useState<{ start: string; end: string }>(defaultTime);
  const [workingDays, setWorkingDays] = useState<string[]>(defaultWorkingDays);
  const [duration, setDuration] = useState(defaultDuration);
  const [bufferTime, setBufferTime] = useState(defaultBufferTime);

  function toggleDay(day: string) {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  }

  const setHandleTime = (type: "start" | "end", value: string) =>
    setTime((prev) => ({ ...prev, [type]: value }));

  // Mock save — later sends clinicName/time/workingDays + preferences to the backend.
  function handleSave() {
    toast.success(MESSAGES.clinicSettings.workingDays.success);
  }

  return {
    clinicName,
    setClinicName,
    time,
    setHandleTime,
    workingDays,
    toggleDay,
    duration,
    setDuration,
    bufferTime,
    setBufferTime,
    handleSave,
  };
}
