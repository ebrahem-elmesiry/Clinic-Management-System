"use client";

import Avatar from "@/shared/components/Avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useAuth } from "@/providers/AuthProvider";

export default function ProfileMenu() {
  const { role } = useAuth();

  const userName =
    role === "doctor"
      ? "Dr. Sarah Johnson"
      : role === "admin"
        ? "Admin User"
        : "John Doe";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <Avatar size="sm" />
          <div className="hidden md:block text-left">
            <p className="text-sm text-gray-900 dark:text-gray-100">
              {userName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {role}
            </p>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-56 p-0">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <p className="text-gray-900 dark:text-gray-100">{userName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {role} Account
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
