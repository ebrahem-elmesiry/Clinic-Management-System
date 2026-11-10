"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { Appointment } from "@/shared/types/appointments";
import {
  busySchedule,
  doctors,
  specialties,
} from "@/shared/constants/appointments";
import { appointmentReasons } from "@/shared/constants/constants";
import {
  AppointmentDetails,
  ScheduleData,
  UseAddNewAppointmentProps,
} from "../../types/appointment";
import { addMinutes, parse, format } from "date-fns";
import { useAppointmentContext } from "@/shared/context/AppointmentContext";

export default function useAddNewAppointment({
  open,
  onOpenChange,
  patientName,
  specialty_id,
  appointmentType,
  showTrigger = true,
  onSchedule,
  clinicInfo,
  setAppointmentsDB,
}: UseAddNewAppointmentProps) {
  const { profile } = useAuth();
  const { doctorFees } = useAppointmentContext();

  const [schedule, setSchedule] = useState<ScheduleData>({
    date: "",
    time: "",
    specialty_id: specialty_id ?? "",
  });
  const [details, setDetails] = useState<AppointmentDetails>({
    patientName: patientName ?? profile.name,
    type: appointmentType ?? "",
    notes: "",
  });

  function handleBusyAppointment(value: string) {
    const busyAppointment = busySchedule.find((b) => b.day === schedule.date);

    return (
      busyAppointment?.appointments.some((b) => {
        if (b.specialty.id !== schedule.specialty_id) return;
        const busyStart = parse(b.time.start, "HH:mm", new Date());
        const busyEnd = addMinutes(
          parse(b.time.end, "HH:mm", new Date()),
          Number(clinicInfo.bufferTime),
        );

        const selectedTime = parse(value, "HH:mm", new Date());
        console.log(
          "selectedTime >= busyStart && selectedTime <= busyEnd",
          selectedTime >= busyStart && selectedTime <= busyEnd,
        );
        return selectedTime >= busyStart && selectedTime <= busyEnd;
      }) || false
    );
  }

  function empty() {
    setDetails({
      patientName: patientName ?? profile.name,
      type: "",
      notes: "",
    });
    setSchedule({
      date: "",
      time: "",
      specialty_id: "",
    });
  }

  const handleScheduleChange = (field: keyof ScheduleData, value: string) =>
    setSchedule((prev) => ({
      ...prev,
      [field]: value,
    }));

  const handleDetailsChange = (
    field: keyof AppointmentDetails,
    value: string,
  ) => setDetails((prev) => ({ ...prev, [field]: value }));

  function handleAddNewAppointment(appointment: Appointment) {
    setAppointmentsDB((prev) => [...prev, appointment]);
  }

  function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    const specialty = specialties.find((s) => s.id === schedule.specialty_id);
    if (!specialty) {
      toast.info("Please select a specialty.");
      return;
    }
    const start_time = schedule.time;

    if (!start_time) {
      toast.info("Please select time.");
      return;
    }

    const end_time = format(
      addMinutes(
        parse(start_time, "HH:mm", new Date()),
        Number(clinicInfo.duration),
      ),
      "HH:mm",
    );

    const doctor = doctors.find((d) => d.id === specialty.doctor_id);
    if (!doctor) {
      toast.info("Please select a specialty.");
      return;
    }

    const appointment: Appointment = {
      id: crypto.randomUUID(),
      date: schedule.date,
      start_time,
      end_time,
      status: "pending",
      reason: details.type,
      patient: {
        id: profile.id,
        name: details.patientName,
        gender: profile.gender,
        age: profile.age,
      },
      doctor: doctor,
      clinic_id: clinicInfo.id,
    };

    const result = handleBusyAppointment(start_time);
    if (result) {
      toast.info("Please select a different time.");
      return;
    }

    handleAddNewAppointment(appointment);
    empty();

    onOpenChange?.(false);
    toast.success("Appointment scheduled successfully.");
  }

  const specialty_price =
    doctorFees.find((d) => d.specialty_id === schedule.specialty_id)?.price ||
    0;

  return {
    open,
    onOpenChange,
    showTrigger,
    schedule,
    setSchedule,
    details,
    workTime: {
      start: clinicInfo?.openingTime,
      end: clinicInfo?.closingTime,
    },
    handleBusyAppointment,
    empty,
    handleScheduleChange,
    handleDetailsChange,
    handleSchedule,
    specialties,
    appointmentReasons,
    specialty_price,
  };
}
