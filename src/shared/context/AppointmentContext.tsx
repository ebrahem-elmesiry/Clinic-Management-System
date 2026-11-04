"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Appointment } from "../types/appointments";

interface AppointmentContextType {
  appointmentsDB: Appointment[];
  setAppointmentsDB: Dispatch<SetStateAction<Appointment[]>>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined,
);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointmentsDB, setAppointmentsDB] = useState<Appointment[]>([]);

  return (
    <AppointmentContext.Provider
      value={{
        appointmentsDB,
        setAppointmentsDB,
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
