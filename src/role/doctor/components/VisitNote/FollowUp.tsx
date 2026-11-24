import { useState } from "react";
import AddNewAppointmentModal from "@/role/patient/modals/addNewAppointment/AddNewAppointment";
import { useAppointmentContext } from "@/shared/context/AppointmentContext";
import { FollowUpAppointment } from "../../types/type";
import FollowUpSummary from "./FollowUpSummary";

interface FollowUpProps {
  followUp: boolean;
  nextAppointment: FollowUpAppointment | null;
  prefill: {
    patientName: string;
    specialtyId: string;
    appointmentType: string;
  };
  onNo: () => void;
  onSchedule: (data: FollowUpAppointment | null) => void;
  onStartSchedule: () => void;
}

export default function FollowUp({
  followUp,
  nextAppointment,
  prefill,
  onNo,
  onSchedule,
  onStartSchedule,
}: FollowUpProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { setAppointmentsDB, clinicInfo } = useAppointmentContext();
  const showSummary = followUp && nextAppointment;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg text-gray-900 dark:text-slate-100">
            Follow-up
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Does the patient need to come back?
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (!nextAppointment) {
                onStartSchedule();
                setModalOpen(true);
              }
            }}
            className={`px-3 py-1.5 text-sm border rounded-lg ${showSummary || modalOpen ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"}`}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setModalOpen(false);
              onNo();
            }}
            className={`px-3 py-1.5 text-sm border rounded-lg ${!showSummary && !modalOpen ? "bg-gray-800 text-white border-gray-800" : "border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"}`}
          >
            No
          </button>
        </div>
      </div>

      <FollowUpSummary nextAppointment={nextAppointment} />

      <AddNewAppointmentModal
        isFollowUp={followUp}
        onSchedule={onSchedule}
        open={modalOpen}
        onOpenChange={setModalOpen}
        showTrigger={false}
        prefill={prefill}
        clinicInfo={clinicInfo}
        setAppointmentsDB={setAppointmentsDB}
      />
    </div>
  );
}
