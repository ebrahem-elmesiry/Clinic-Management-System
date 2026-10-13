"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_VIEW } from "@/role/admin/constants/appointments";
import type { ViewType } from "@/role/admin/types/type";

type FilterType = "status" | "doctor";

export default function AppointmentFilterHook() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const view = (searchParams.get("view") as ViewType | null) ?? DEFAULT_VIEW;

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

  function handleView(value: ViewType) {
    replaceParams((params) => {
      if (value === DEFAULT_VIEW) {
        params.delete("view");
      } else {
        params.set("view", value);
      }
    });
  }

  return { search, setSearch, view, handleSearch, handleFilter, handleView };
}
