"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Appointment, ClinicType } from "../types/appointment";
import { doctorsWithSpecialty } from "@/role/admin/constants/clinicInfo";
import { SpecialtyPrice } from "@/role/admin/types/doctorFees";

interface AppointmentContextType {
  appointmentsDB: Appointment[];
  setAppointmentsDB: Dispatch<SetStateAction<Appointment[]>>;
  clinicInfo: ClinicType;
  setClinicInfo: Dispatch<SetStateAction<ClinicType>>;
  doctorFees: SpecialtyPrice[];
  setDoctorFees: Dispatch<SetStateAction<SpecialtyPrice[]>>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined,
);

export const AppointmentProvider = ({
  children,
  clinicInfoS,
}: {
  children: ReactNode;

  clinicInfoS: ClinicType;
}) => {
  const [appointmentsDB, setAppointmentsDB] = useState<Appointment[]>([]);

  const [clinicInfo, setClinicInfo] = useState<ClinicType>(clinicInfoS);
  const [doctorFees, setDoctorFees] =
    useState<SpecialtyPrice[]>(doctorsWithSpecialty);

  return (
    <AppointmentContext.Provider
      value={{
        appointmentsDB,
        setAppointmentsDB,
        clinicInfo,
        setClinicInfo,
        doctorFees,
        setDoctorFees,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);

  if (!context) {
    throw new Error(
      "useAppointmentContext must be used within AppointmentProvider",
    );
  }

  return context;
};
