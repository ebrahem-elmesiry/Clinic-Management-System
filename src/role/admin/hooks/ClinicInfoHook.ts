"use client";

import { toast } from "sonner";
import { MESSAGES } from "@/role/admin/constants/messages";
import { useAppointmentContext } from "@/shared/context/AppointmentContext";
import { clinicInfoSchema } from "@/role/admin/validations/settings/validation";
import { ClinicFieldType } from "@/role/admin/types/clinicInfo";

export default function ClinicInfoHook() {
  const { clinicInfo, setClinicInfo } = useAppointmentContext();

  function setClinicField(
    value: string,
    type: ClinicFieldType,
    timeType?: "start" | "end",
  ) {
    setClinicInfo((prev) => {
      if (type === "time") {
        return {
          ...prev,
          ...(timeType === "start"
            ? { openingTime: value }
            : { closingTime: value }),
        };
      }
      return { ...prev, [type]: value };
    });
  }

  function toggleDay(day: number) {
    setClinicInfo((prev) => ({
      ...prev,
      working_days: prev.working_days.includes(day)
        ? prev.working_days.filter((d) => d !== day)
        : [...prev.working_days, day],
    }));
  }

  function handleSave() {
    const result = clinicInfoSchema.safeParse(clinicInfo);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    toast.success(MESSAGES.clinicSettings.clinicInfo.success);
  }

  return {
    clinicInfo,
    setClinicField,
    toggleDay,
    handleSave,
  };
}
