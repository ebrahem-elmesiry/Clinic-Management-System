"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterType = "status" | "doctor";

export default function AppointmentFilterHook() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  function replaceParams(update: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    update(params);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSearch(text: string) {
    replaceParams((params) => {
      if (!text) {
        params.delete("search");
      } else {
        params.set("search", text);
      }
    });
  }

  function handleFilter(type: FilterType, value: string) {
    replaceParams((params) => {
      if (!value || value === "all") {
        params.delete(type);
      } else {
        params.set(type, value);
      }
    });
  }

  return { search, setSearch, handleSearch, handleFilter };
}
