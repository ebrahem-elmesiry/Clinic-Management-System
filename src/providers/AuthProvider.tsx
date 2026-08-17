"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

export type UserRole = "doctor" | "admin" | "patient";

interface AuthContextValue {
  role: UserRole | null;
  isLoggedIn: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);

  const login = useCallback((nextRole: UserRole) => {
    setRole(nextRole);
  }, []);

  const logout = useCallback(() => {
    setRole(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ role, isLoggedIn: role !== null, login, logout }}
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
