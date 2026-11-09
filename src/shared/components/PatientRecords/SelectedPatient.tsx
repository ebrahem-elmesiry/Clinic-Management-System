"use client";

import { User, ChevronRight } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PatientListItem } from "@/shared/types/patientRecords";
import { formatLastVisit } from "@/utils/formatLastVisit";
import { useEffect, useState } from "react";

interface SelectedPatientProps {
  patients: PatientListItem[];
  selectedPatient: string | null;
}

export default function SelectedPatient({
  patients,
  selectedPatient,
}: SelectedPatientProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { replace } = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(patients);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setSearch(patients);
    } else {
      const filter = patients.filter((p) =>
        p.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      );
      setSearch(filter);
    }
  }, [patients, query]);

  function handlePatientSearch(value: string) {
    setQuery(value);
    const filter = patients.filter((p) =>
      p.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    );
    setSearch(filter);
  }

  function handlePatientURL(patientId: string) {
    params.set("patientID", patientId);
    if (!params.get("tab")) {
      params.set("tab", "visit-history");
    }
    replace(`${pathname}?${params}`, { scroll: false });
  }

  return (
    <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Input
          onChange={(e) => handlePatientSearch(e.target.value)}
          placeholder="Search patients..."
        />
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
        {search.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">No results match your search</p>
            {query.trim() ? (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                We couldn&apos;t find anything for <span className="font-semibold">&quot;{query.trim()}&quot;</span>. Try a different name.
              </p>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Try searching by patient name.</p>
            )}
          </div>
        ) : (
          search.map((patient) => (
            <button
              key={patient.id}
              onClick={() => {
                handlePatientURL(patient.id);
              }}
              className={`w-full p-4 border-b border-gray-100 dark:border-gray-700 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                selectedPatient === patient.id
                  ? "bg-blue-50 dark:bg-blue-900/30 border-l-4 border-l-blue-600 dark:border-l-blue-400"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
                    {patient.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {patient.age} yrs • {patient.gender}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Last visit: {formatLastVisit(patient.lastVisit)}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
