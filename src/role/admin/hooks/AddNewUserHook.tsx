"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  adminUserSchema,
  adminUserSchemaEdit,
} from "@/role/admin/validations/settings/validation";
import {
  doctorUserSchema,
  doctorUserSchemaEdit,
} from "@/role/doctor/validations/validation";
import {
  patientUserSchema,
  patientUserSchemaEdit,
} from "@/role/patient/validations/validation";
import { toast } from "sonner";
import {
  adminRecord,
  doctorRecord,
  patientRecord,
  Role,
  UserRecord,
} from "@/role/admin/types/user-management";
import { users } from "../constants";

interface AddNewUserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingUser?: UserRecord | null;
  onSaveUser?: (user: UserRecord) => void;
  onClearEdit?: () => void;
  face: 1 | 2;
  setFace: (face: 1 | 2) => void;
  setAddUserOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddNewUserHook({
  open,
  onOpenChange,
  editingUser,
  onSaveUser,
  onClearEdit,
  face,
  setFace,
  setAddUserOpen,
}: AddNewUserProps) {
  const [commonData, setCommonData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [role, setRole] = useState<Role | undefined>(undefined);

  const isEditing = !!editingUser;
  const isRoleDoctor = role === "doctor";
  const isRoleAdmin = role === "admin";
  const isRolePatient = role === "patient";

  useEffect(() => {
    const currentUser = users.find((u) => u.id === editingUser?.id);
    setCommonData({
      firstName: currentUser?.name.split(" ")[0] || "",
      lastName: currentUser?.name.split(" ")[1] || "",
      password: "",
    });

    setEmail(currentUser?.email || "");
    setPhone(currentUser?.phone || "");
    setSpecialty(currentUser?.specialty || "");
    setRole((currentUser?.role as Role) ?? undefined);
  }, [editingUser]);

  const resetForm = () => {
    setCommonData({ firstName: "", lastName: "", password: "" });
    setEmail("");
    setPhone("");
    setSpecialty("");
    setRole(undefined);
  };

  function isDoctor(user: UserRecord): user is doctorRecord {
    return user.role === "doctor";
  }

  function isAdmin(user: UserRecord): user is adminRecord {
    return user.role === "admin";
  }

  function isPatient(user: UserRecord): user is patientRecord {
    return user.role === "patient";
  }

  const populateForEdit = (user: UserRecord) => {
    setRole(user.role);
    const [first_name, last_name] = user.name.split(" ");
    setCommonData({
      firstName: first_name,
      lastName: last_name,
      password: "",
    });
    if (isDoctor(user)) {
      setSpecialty(user.specialty);
      setEmail(user.email);
    }
    if (isAdmin(user)) setEmail(user.email);
    if (isPatient(user)) setPhone(user.phone);
  };
  // it's fire when Dialog status changed (true => open, false => close)
  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      if (editingUser) {
        populateForEdit(editingUser);
        setFace(2);
      } else {
        resetForm();
        setFace(1);
      }
    } else {
      onClearEdit?.();
      resetForm();
      setFace(1);
    }
    onOpenChange(nextOpen);
  };

  // reset all things
  const handleCreateClick = () => {
    setAddUserOpen(true);
    resetForm();
    setFace(1);
  };

  const handleNext = () => role && setFace(2);
  const handleBack = () => setFace(1);
  // Validate Patient Data
  function validatePatient() {
    if (editingUser) {
      return patientUserSchemaEdit.safeParse({
        firstName: commonData.firstName,
        lastName: commonData.lastName,
        phone,
      });
    }

    return patientUserSchema.safeParse({
      firstName: commonData.firstName,
      lastName: commonData.lastName,
      phone,
      password: commonData.password,
    });
  }
  // Validate Doctor Data
  function validateDoctor() {
    if (editingUser) {
      return doctorUserSchemaEdit.safeParse({
        firstName: commonData.firstName,
        lastName: commonData.lastName,
        specialty,
        email,
      });
    }

    return doctorUserSchema.safeParse({
      firstName: commonData.firstName,
      lastName: commonData.lastName,
      specialty,
      email,
      password: commonData.password,
    });
  }
  // Validate Admin Data
  function validateAdmin() {
    if (editingUser) {
      return adminUserSchemaEdit.safeParse({
        firstName: commonData.firstName,
        lastName: commonData.lastName,
        email,
      });
    }

    return adminUserSchema.safeParse({
      firstName: commonData.firstName,
      lastName: commonData.lastName,
      email,
      password: commonData.password,
    });
  }
  // function to collect all validate functions
  function validateUser() {
    if (isRolePatient) {
      return validatePatient();
    }

    if (isRoleDoctor) {
      return validateDoctor();
    }

    return validateAdmin();
  }
  // to save role in onSaveUser function
  function saveUser() {
    const fullName =
      `${commonData.firstName.trim()} ${commonData.lastName.trim()}`.trim();

    const baseUser = {
      id: editingUser ? editingUser.id : String(Date.now()),
      name: fullName,
      role: role!,
      joinDate: editingUser
        ? editingUser.joinDate
        : new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
    };

    const admin: adminRecord = {
      ...baseUser,
      email,
    };

    const doctor: doctorRecord = {
      ...baseUser,
      specialty,
      email,
      patients: 100,
    };

    const patient: patientRecord = {
      ...baseUser,
      phone,
    };

    if (isDoctor(doctor)) {
      onSaveUser?.(doctor);
    }

    if (isAdmin(admin)) {
      onSaveUser?.(admin);
    }

    if (isPatient(patient)) {
      onSaveUser?.(patient);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!role) return;

    const result = validateUser();

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    saveUser();

    handleOpenChange(false);
  }

  return {
    open,
    face,
    commonData,
    setCommonData,
    email,
    setEmail,
    phone,
    setPhone,
    specialty,
    setSpecialty,
    role,
    setRole,
    isEditing,
    isRoleDoctor,
    isRoleAdmin,
    isRolePatient,
    handleOpenChange,
    handleCreateClick,
    handleNext,
    handleBack,
    handleSubmit,
  };
}
