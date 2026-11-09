"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAppointmentContext } from "@/shared/context/AppointmentContext";
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

export default function useAddNewAppointment({
  open,
  onOpenChange,
  patientName,
  specialty_id,
  appointmentType,
  showTrigger = true,
  onSchedule,
}: UseAddNewAppointmentProps) {
  const { setAppointmentsDB } = useAppointmentContext();
  const { profile, clinicInfo } = useAuth();

  const [schedule, setSchedule] = useState<ScheduleData>({
    date: "",
    time: "",
    specialty: specialty_id ?? "",
  });

  const workTime = {
    start: "07:00",
    end: "22:00",
  };

  function handleBusyAppointment(value: string) {
    const busyAppointment = busySchedule.find((b) => b.day === schedule.date);
    return (
      busyAppointment?.times.some((b) => value >= b.start && value <= b.end) ||
      false
    );
  }

  const [details, setDetails] = useState<AppointmentDetails>({
    patientName: patientName ?? profile.name,
    type: appointmentType ?? "",
    notes: "",
  });

  function empty() {
    setDetails({
      patientName: patientName ?? profile.name,
      type: "",
      notes: "",
    });
    setSchedule({
      date: "",
      time: "",
      specialty: "",
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
    const specialty = specialties.find((s) => s.id === schedule.specialty);
    if (!specialty) {
      toast.info("please select specialty");
      return;
    }
    const time = schedule.time;

    if (!time) {
      toast.info("please select time");
      return;
    }
    const doctor = doctors.find((d) => d.id === specialty.doctor_id);
    if (!doctor) {
      toast.info("please select specialty");
      return;
    }

    const appointment: Appointment = {
      id: crypto.randomUUID(),
      date: schedule.date,
      start_time: time,
      end_time: time,
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

    handleAddNewAppointment(appointment);
    empty();

    onOpenChange?.(false);
    toast.success("Appointment scheduled successfully.");
  }

  return {
    open,
    onOpenChange,
    showTrigger,
    schedule,
    setSchedule,
    details,
    workTime,
    handleBusyAppointment,
    empty,
    handleScheduleChange,
    handleDetailsChange,
    handleSchedule,
    specialties,
    appointmentReasons,
  };
}
