"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "@/shared/components/auth/components/AuthPage";
import { useAuth } from "@/providers/AuthProvider";

const roleHome: Record<string, string> = {
  doctor: "/doctor/dashboard",
  admin: "/admin/dashboard",
  patient: "/patient/dashboard",
};

export default function AuthRoute() {
  const { role, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(roleHome[role!]);
    }
  }, [role, isLoggedIn, router]);

  return <LoginPage />;
}
