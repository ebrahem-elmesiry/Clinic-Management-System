"use client";

import { User } from "lucide-react";
import { Label } from "@/shared/components/ui/label";
import { UserRole } from "@/shared/types/type";
import { RoleSelectionProps } from "../types/types";

export default function RoleSelection({
  selectedRole,
  setSelectedRole,
}: RoleSelectionProps) {
  return (
    <div className="mb-6">
      <Label className="mb-3 block text-gray-700 dark:text-gray-300">
        Login as
      </Label>
      <div className="grid grid-cols-3 gap-2">
        {["doctor", "patient", "admin"].map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => setSelectedRole(role as UserRole)}
            className={`
                      p-3 rounded-lg border-2 transition-all
                      ${
                        selectedRole === role
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500"
                      }
                    `}
          >
            <User className="w-5 h-5 mx-auto mb-1" />
            <p className="text-xs capitalize">{role}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
