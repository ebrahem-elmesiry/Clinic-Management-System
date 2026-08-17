"use client";

import React, { useState } from "react";
import { Bell, Menu, User } from "lucide-react";
import Search from "./Search";
import LogoutButton from "./LogoutButton";
import Avatar from "@/shared/components/Avatar";

type UserRole = "doctor" | "admin" | "patient";

interface HeaderProps {
  userRole: UserRole | null;
  onLogout: () => void;
  onMenuToggle: () => void;
}

export default function Header({ userRole, onLogout, onMenuToggle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, text: "New appointment scheduled", time: "5 min ago", unread: true },
    { id: 2, text: "Patient John Doe checked in", time: "15 min ago", unread: true },
    { id: 3, text: "Lab results ready for review", time: "1 hour ago", unread: false },
  ];

  const userName =
    userRole === "doctor" ? "Dr. Sarah Johnson" : userRole === "admin" ? "Admin User" : "John Doe";

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <Search />
        </div>

        {/* Right side - Notifications & Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          notif.unread ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="text-sm text-gray-900">{notif.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
            >
              <Avatar size="sm" />
              <div className="hidden md:block text-left">
                <p className="text-sm text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </button>

            {showProfile && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowProfile(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500 capitalize">{userRole} Account</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-lg">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">My Profile</span>
                    </button>
                    <LogoutButton onLogout={onLogout} />
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
