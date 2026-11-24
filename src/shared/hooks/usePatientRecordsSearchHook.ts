import { useEffect, useRef, useState } from "react";
import { PatientProfile } from "../types/patientRecords";

export default function usePatientRecordsSearchHook(
  patientProfiles: PatientProfile[],
) {
  const [search, setSearch] = useState(patientProfiles);
  const [query, setQuery] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setSearch(patientProfiles);
  }, [patientProfiles]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | number | undefined>(
    undefined,
  );

  function handlePatientSearch(value: string) {
    clearTimeout(timerRef.current);

    if (value === "") {
      setIsPending(false);
      setSearch(patientProfiles);
      setQuery("");
      return;
    }

    setIsPending(true);

    timerRef.current = setTimeout(() => {
      setQuery(value);

      const filter = patientProfiles.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase()),
      );

      setSearch(filter);
      setIsPending(false);
    }, 1000);
  }

  return { handlePatientSearch, search, query, isPendingSearch: isPending };
}
