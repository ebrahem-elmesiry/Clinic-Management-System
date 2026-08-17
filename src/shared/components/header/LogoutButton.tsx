"use client";

import React from "react";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  onLogout: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <button
      onClick={onLogout}
      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-red-50 rounded-lg text-red-600"
    >
      <LogOut className="w-4 h-4" />
      <span className="text-sm">Logout</span>
    </button>
  );
}
