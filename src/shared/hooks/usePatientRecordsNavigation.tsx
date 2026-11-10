"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function usePatientRecordsNavigation() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "visit-history";

  function handleTabChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return {
    tab,
    handleTabChange,
  };
}
