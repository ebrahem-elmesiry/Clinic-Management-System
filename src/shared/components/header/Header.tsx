"use client";

import { useState } from "react";
import { Bell, User } from "lucide-react";
import Search from "./Search";
import LogoutButton from "./LogoutButton";
import DarkModeToggle from "./DarkModeToggle";
import Avatar from "@/shared/components/Avatar";
import MobileSidebar from "../sidebar/MobileSidebar";
import { useAuth } from "@/providers/AuthProvider";

export default function Header() {
  const { role, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const userName =
    role === "doctor"
      ? "Dr. Sarah Johnson"
      : role === "admin"
        ? "Admin User"
        : "John Doe";
  return (
    <header className="sticky top-0 z-40 md:ml-60 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <MobileSidebar />
          <Search />
        </div>

        {/* Right side - Dark Mode, Notifications & Profile */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
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

            {showProfile && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowProfile(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-gray-900 dark:text-gray-100">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {role} Account
                    </p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                      <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        My Profile
                      </span>
                    </button>
                    <LogoutButton onLogout={logout} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
