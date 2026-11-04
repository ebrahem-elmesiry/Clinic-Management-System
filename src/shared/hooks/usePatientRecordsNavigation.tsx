"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function usePatientRecordsNavigation() {
  const { profile: userData, role } = useAuth();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "visit-history";

  const patientId =
    role === "patient" ? userData.id : searchParams.get("patientID");

  function handleTabChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return {
    tab,
    patientId,
    handleTabChange,
  };
}
