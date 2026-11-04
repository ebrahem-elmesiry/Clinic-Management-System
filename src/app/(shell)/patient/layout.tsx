import { AppointmentProvider } from "@/shared/context/AppointmentContext";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <AppointmentProvider>{children}</AppointmentProvider>
    </main>
  );
}
