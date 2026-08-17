"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "@/shared/components/auth/LoginPage";
import { useAuth } from "@/providers/AuthProvider";

const roleHome: Record<string, string> = {
  doctor: "/doctor/dashboard",
  admin: "/admin/dashboard",
  patient: "/patient/dashboard",
};

export default function LoginRoute() {
  const { role, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(roleHome[role || "patient"]);
    }
  }, [role, isLoggedIn, router]);

  return <LoginPage />;
}
