"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MESSAGES } from "@/role/admin/constants/messages";
import {
  adminProfileSchema,
  doctorProfileSchema,
  patientProfileSchema,
} from "@/role/admin/validations/settings/validation";
import {
  adminProfile,
  doctorProfile,
  patientProfile,
  Profile,
  UserRole,
} from "@/shared/types/type";
import { isAdminProfile, isDoctorProfile, isPatientProfile } from "@/lib/utils";

export default function ProfileInputsHook(
  profile: Profile,
  userRole: UserRole,
) {
  const [name, setName] = useState({
    first: profile.firstName,
    last: profile.lastName,
  });
  const [email, setEmail] = useState(() => {
    if (isAdminProfile(profile) || isDoctorProfile(profile))
      return profile.email;
  });
  const [patientInfo, setPatientInfo] = useState(() => {
    if (isPatientProfile(profile)) {
      return {
        address: profile.address,
        blood: profile.blood,
        date: profile.date,
        phone: profile.phone,
      };
    }
  });
  const specialty = isDoctorProfile(profile) ? profile.specialty : "";

  function setNameData(type: "first" | "last", value: string) {
    setName((prev) => ({ ...prev, [type]: value }));
  }
  function setEmailData(value: string) {
    setEmail(value);
  }
  function setPatientInfoData(
    type: "address" | "blood" | "date" | "phone",
    value: string,
  ) {
    setPatientInfo((prev) => {
      if (!prev) return undefined;
      return {
        ...prev,
        [type]: value,
      };
    });
  }

  function handleDoctorSave() {
    if (!email) return toast.info("please write email");
    const doctor: doctorProfile = {
      firstName: name.first,
      lastName: name.last,
      email,
      specialty,
      role: userRole as UserRole,
    };
    const result = doctorProfileSchema.safeParse(doctor);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return false;
    }
    return true;
  }
  function handlePatientSave() {
    if (!patientInfo?.phone)
      return toast.info("Please enter your phone number");
    if (!patientInfo.address) return toast.info("Please enter your address");
    if (!patientInfo.blood) return toast.info("Please select your blood type");
    if (!patientInfo.date) return toast.info("Please enter your date of birth");

    const patient: patientProfile = {
      firstName: name.first,
      lastName: name.last,
      phone: patientInfo.phone,
      address: patientInfo.address,
      blood: patientInfo.blood,
      date: patientInfo.date,
      role: userRole as UserRole,
    };
    console.log("patient", patient);
    const result = patientProfileSchema.safeParse(patient);
    console.log("result", result);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return false;
    }
    return true;
  }
  function handleAdminSave() {
    if (!email) return toast.info("please write email");
    const admin: adminProfile = {
      firstName: name.first,
      lastName: name.last,
      email,
      role: userRole as UserRole,
    };
    const result = adminProfileSchema.safeParse(admin);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return false;
    }
    return true;
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    console.log("userRole", userRole);
    if (userRole === "doctor") {
      const check = handleDoctorSave();
      if (!check) return;
    } else if (userRole === "patient") {
      const check = handlePatientSave();
      if (!check) return;
    } else if (userRole === "admin") {
      const check = handleAdminSave();
      console.log("check", check);
      if (!check) return;
    }
    toast.success(MESSAGES.profile.saved);
  }

  return {
    handleSave,
    name,
    setNameData,
    email,
    setEmailData,
    specialty,
    patientInfo,
    setPatientInfoData,
  };
}
