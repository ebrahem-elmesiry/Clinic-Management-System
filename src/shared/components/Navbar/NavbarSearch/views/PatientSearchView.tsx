"use client";

import { NavbarSearchData } from "@/shared/types/navbarSearch";
import { AppointmentResultItem, SectionTitle } from "./SearchResultItems";

interface PatientSearchViewProps {
  results: NavbarSearchData;
}

export default function PatientSearchView({ results }: PatientSearchViewProps) {
  if (results.appointments.length === 0) return null;

  return (
    <div className="py-1">
      <SectionTitle label="Appointments" count={results.appointments.length} />
      {results.appointments.map((a) => (
        <AppointmentResultItem key={a.id} appointment={a} />
      ))}
    </div>
  );
}
