"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { changePasswordSchema } from "@/shared/validations/password-validations";

type PasswordField = "currentPassword" | "newPassword" | "confirmPassword";

type ShowField = "current" | "new" | "confirm";

export default function SecurityPanelHook() {
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function setPassword(field: PasswordField, value: string) {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function toggleShow(field: ShowField) {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = changePasswordSchema.safeParse(passwords);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    toast.success("Password updated successfully");

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  return {
    show,
    passwords,
    setPassword,
    toggleShow,
    handleSubmit,
  };
}
