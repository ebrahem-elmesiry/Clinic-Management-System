"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAppointmentContext } from "@/shared/context/AppointmentContext";
import { useAuth } from "@/providers/AuthProvider";
import { Appointment, Doctor, Specialty } from "@/shared/types/appointment";
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
import { FollowUpAppointment } from "@/role/doctor/types/type";

export default function useAddNewAppointment({
  onOpenChange,
  prefill,
  onSchedule,
  clinicInfo,
  setAppointmentsDB,
  isFollowUp = false,
}: UseAddNewAppointmentProps) {
  const { profile } = useAuth();
  const { doctorFees } = useAppointmentContext();

  const [schedule, setSchedule] = useState<ScheduleData>({
    date: "",
    time: "",
    specialty_id: prefill?.specialtyId ?? "",
  });
  const [details, setDetails] = useState<AppointmentDetails>({
    patientName: prefill?.patientName ?? profile.name,
    type: prefill?.appointmentType ?? "",
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
        return selectedTime >= busyStart && selectedTime <= busyEnd;
      }) || false
    );
  }

  function empty() {
    setDetails({
      patientName: prefill?.patientName ?? profile.name,
      type: prefill?.appointmentType ?? "",
      notes: "",
    });
    setSchedule({
      date: "",
      time: "",
      specialty_id: prefill?.specialtyId ?? "",
    });
    onOpenChange?.(false);
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

  function getSelectedSpecialty(): Specialty | undefined {
    return specialties.find((s) => s.id === schedule.specialty_id);
  }

  function getSpecialtyDoctor(specialty: Specialty): Doctor | undefined {
    return doctors.find((d) => d.id === specialty.doctor_id);
  }

  function computeEndTime(startTime: string): string {
    return format(
      addMinutes(
        parse(startTime, "HH:mm", new Date()),
        Number(clinicInfo.duration),
      ),
      "HH:mm",
    );
  }

  function buildAppointment(doctor: Doctor, startTime: string): Appointment {
    return {
      id: crypto.randomUUID(),
      date: schedule.date,
      start_time: startTime,
      end_time: computeEndTime(startTime),
      status: "pending",
      reason: details.type,
      patient: {
        id: profile.id,
        name: details.patientName,
        gender: profile.gender,
        age: profile.age,
      },
      doctor,
      clinic_id: clinicInfo.id,
    };
  }

  function buildScheduleData(
    specialty: Specialty,
    startTime: string,
  ): FollowUpAppointment {
    return {
      patientName: details.patientName,
      specialty: specialty.name,
      date: schedule.date,
      time: startTime,
      type: details.type,
      notes: details.notes,
    };
  }

  function handleSchedule(e: React.FormEvent) {
    e.preventDefault();

    const specialty = getSelectedSpecialty();
    if (!specialty) {
      toast.info("Please select a specialty.");
      return;
    }

    const startTime = schedule.time;
    if (!startTime) {
      toast.info("Please select time.");
      return;
    }

    const doctor = getSpecialtyDoctor(specialty);
    if (!doctor) {
      toast.info("Please select a specialty.");
      return;
    }

    if (handleBusyAppointment(startTime)) {
      toast.info("Please select a different time.");
      return;
    }

    if (isFollowUp) {
      onSchedule?.(buildScheduleData(specialty, startTime));
      toast.success("Appointment has been saved.");
    } else {
      handleAddNewAppointment(buildAppointment(doctor, startTime));
      toast.success("Appointment scheduled successfully.");
    }
    empty();
  }

  const specialty_price =
    doctorFees.find((d) => d.specialty_id === schedule.specialty_id)?.price ||
    0;

  return {
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
