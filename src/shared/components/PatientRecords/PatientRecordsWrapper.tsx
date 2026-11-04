"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import VisitHistoryTab from "./tabs/VisitHistoryTab";
import VitalsTab from "./tabs/VitalsTab";
import PrescriptionsTab from "./tabs/PrescriptionsTab";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { personalData } from "@/shared/types/type";
import {
  Prescription,
  VisitRecord,
  Vital,
} from "@/shared/types/patientRecords";
import usePatientRecordsNavigation from "@/shared/hooks/usePatientRecordsNavigation";

interface PatientRecordsWrapperProps {
  isUnknownPatient?: boolean;
  vitals: Vital[];
  visits: VisitRecord[];
  prescriptions: Prescription[];
  patient: personalData | undefined;
}

export default function PatientRecordsWrapper({
  isUnknownPatient,
  visits,
  vitals,
  prescriptions,
  patient,
}: PatientRecordsWrapperProps) {
  const { tab, patientId, handleTabChange } = usePatientRecordsNavigation();
  return (
    <>
      <Tabs value={tab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <TabsTrigger
            value="visit-history"
            className="data-[state=active]:font-bold"
          >
            Visit History
          </TabsTrigger>

          <TabsTrigger value="vitals" className="data-[state=active]:font-bold">
            Vitals
          </TabsTrigger>

          <TabsTrigger
            value="prescriptions"
            className="data-[state=active]:font-bold"
          >
            Prescriptions
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {tab === "visit-history" && (
        <VisitHistoryTab
          visits={visits}
          isUnknown={isUnknownPatient}
          patientId={patientId}
        />
      )}

      {tab === "vitals" && (
        <VitalsTab
          vitals={vitals}
          patient={patient}
          isUnknown={isUnknownPatient}
          patientId={patientId}
        />
      )}

      {tab === "prescriptions" && (
        <PrescriptionsTab
          prescriptions={prescriptions}
          patient={patient}
          isUnknown={isUnknownPatient}
        />
      )}
    </>
  );
}
