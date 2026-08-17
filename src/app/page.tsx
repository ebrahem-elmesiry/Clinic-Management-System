"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

const roleHome: Record<string, string> = {
  doctor: "/doctor/dashboard",
  admin: "/admin/dashboard",
  patient: "/patient/dashboard",
};

export default function HomePage() {
  const { role, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    router.replace(roleHome[role || "patient"]);
  }, [role, isLoggedIn, router]);

  return null;
}
