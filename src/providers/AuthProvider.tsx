"use client";

import { clinicType, personalData, UserRole } from "@/shared/types/type";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

interface AuthContextValue {
  role: UserRole | null;
  isLoggedIn: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  profile: personalData;
  clinicInfo: clinicType;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({
  children,
  profile,
  clinicInfo,
}: {
  children: React.ReactNode;
  profile: personalData;
  clinicInfo: clinicType;
}) {
  const router = useRouter();

  const [role, setRole] = useState<UserRole | null>("patient");
  const login = (nextRole: UserRole) => {
    setRole(nextRole);
  };

  const logout = () => {
    router.push("/login");
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ role, isLoggedIn: !!role, login, logout, profile, clinicInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
