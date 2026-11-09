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
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: personalData;
}) {
  const router = useRouter();

  const [role, setRole] = useState<UserRole | null>("admin");
  const login = (nextRole: UserRole) => {
    setRole(nextRole);
  };

  const logout = () => {
    router.push("/login");
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ role, isLoggedIn: !!role, login, logout, profile }}
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
