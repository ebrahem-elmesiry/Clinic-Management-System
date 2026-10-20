"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { UserRole } from "@/shared/types/type";
import { NavbarSearchData } from "@/shared/types/navbarSearch";
import {
  adminSearchData,
  doctorSearchData,
  patientSearchData,
} from "@/shared/constants/navbarSearch";

const EMPTY_RESULTS: NavbarSearchData = {
  patients: [],
  doctors: [],
  appointments: [],
};

function getRoleData(role: UserRole | null): NavbarSearchData {
  if (role === "admin") return adminSearchData;
  if (role === "doctor") {
    return {
      patients: doctorSearchData.patients,
      doctors: [],
      appointments: doctorSearchData.appointments,
    };
  }
  return {
    patients: [],
    doctors: [],
    appointments: patientSearchData.appointments,
  };
}

function matches(query: string, value: string) {
  return value.toLowerCase().includes(query.toLowerCase());
}

async function fetchSearchResults(
  role: UserRole | null,
  query: string,
): Promise<NavbarSearchData> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = getRoleData(role);

  return {
    patients: data.patients.filter((p) => matches(query, p.name)),
    doctors: data.doctors.filter(
      (d) => matches(query, d.name) || matches(query, d.specialty),
    ),
    appointments: data.appointments.filter(
      (a) => matches(query, a.patientName) || matches(query, a.doctorName),
    ),
  };
}

export default function useNavbarSearchHook() {
  const { role } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NavbarSearchData>(EMPTY_RESULTS);
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults(EMPTY_RESULTS);
      setIsPending(false);
      return;
    }

    let active = true;
    setIsPending(true);

    fetchSearchResults(role, trimmed).then((data) => {
      if (!active) return;
      setResults(data);
      setIsPending(false);
    });

    return () => {
      active = false;
    };
  }, [query, role]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setQuery("");
  }
  const hasQuery = query.trim().length > 0;

  const total =
    results.patients.length +
    results.doctors.length +
    results.appointments.length;

  const hint =
    role === "admin"
      ? "Search for patients, doctors, or appointments"
      : role === "doctor"
        ? "Search for patients or appointments"
        : "Search for your appointments";
  return {
    query,
    setQuery,
    results,
    isPending,
    total,
    handleOpenChange,
    open,
    hasQuery,
    role,
    hint,
  };
}
