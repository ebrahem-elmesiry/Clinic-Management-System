"use client";

import { NavbarSearchData } from "@/shared/types/navbarSearch";
import {
  AppointmentResultItem,
  DoctorResultItem,
  PatientResultItem,
  SectionTitle,
} from "./SearchResultItems";

interface AdminSearchViewProps {
  results: NavbarSearchData;
}

export default function AdminSearchView({ results }: AdminSearchViewProps) {
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

      {results.doctors.length > 0 && (
        <div>
          <SectionTitle label="Doctors" count={results.doctors.length} />
          {results.doctors.map((d) => (
            <DoctorResultItem key={d.id} doctor={d} />
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
