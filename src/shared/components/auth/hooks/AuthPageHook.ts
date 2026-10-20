"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { UserRole } from "@/shared/types/type";
import { loginSchema, registerSchema } from "../validation/validation";

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const roleHome: Record<UserRole, string> = {
  doctor: "/doctor/dashboard",
  admin: "/admin/dashboard",
  patient: "/patient/dashboard",
};

export default function useAuthPageHook() {
  const { login } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>("doctor");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isLogin) {
      const result = loginSchema.safeParse({ email, password });
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }

      login(selectedRole);
      router.push(roleHome[selectedRole]);
      toast.success("Welcome back!");
      return;
    }

    const result = registerSchema.safeParse({
      fullName,
      email,
      password,
    });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    login(selectedRole);
    router.push(roleHome[selectedRole]);
    toast.success("Account created successfully.");
  }

  return {
    isLogin,
    setIsLogin,
    selectedRole,
    setSelectedRole,
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
}
