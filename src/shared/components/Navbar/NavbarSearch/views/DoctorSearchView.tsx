"use client";

import { NavbarSearchData } from "@/shared/types/navbarSearch";
import {
  AppointmentResultItem,
  PatientResultItem,
  SectionTitle,
} from "./SearchResultItems";

interface DoctorSearchViewProps {
  results: NavbarSearchData;
}

export default function DoctorSearchView({ results }: DoctorSearchViewProps) {
  return (
    <div className="py-1">
      {results.patients.length > 0 && (
        <div>
          <SectionTitle label="Patients" count={results.patients.length} />
          {results.patients.map((p) => (
            <PatientResultItem key={p.id} patient={p} />
          ))}
        </div>
      )}

      {results.appointments.length > 0 && (
        <div>
          <SectionTitle
            label="Appointments"
            count={results.appointments.length}
          />
          {results.appointments.map((a) => (
            <AppointmentResultItem key={a.id} appointment={a} />
          ))}
        </div>
      )}
    </div>
  );
}
