"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Palette,
  Settings,
  Stethoscope,
  UserCog,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

type UserRole = "doctor" | "admin" | "patient";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const menuItems: Record<UserRole, NavItem[]> = {
  doctor: [
    { href: "/doctor/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/doctor/appointments", label: "Appointments", icon: Calendar },
    { href: "/doctor/patient-records", label: "Patient Records", icon: Users },
    { href: "/doctor/visit-notes", label: "Visit Notes", icon: ClipboardList },
    { href: "/doctor/settings", label: "Settings", icon: Settings },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/appointments", label: "Appointments", icon: Calendar },
    { href: "/admin/patients", label: "Patients", icon: Users },
    { href: "/admin/user-management", label: "User Management", icon: UserCog },
    { href: "/admin/settings", label: "Settings", icon: Settings },
    { href: "/admin/design-system", label: "Design System", icon: Palette },
  ],
  patient: [
    { href: "/patient/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/patient/appointments", label: "My Appointments", icon: Calendar },
    { href: "/patient/medical-records", label: "Medical Records", icon: FileText },
    { href: "/patient/settings", label: "Settings", icon: Settings },
  ],
};

interface SidebarProps {
  userRole: UserRole | null;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ userRole, isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const items = menuItems[userRole || "patient"];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">HealthCare</h1>
                <p className="text-xs text-gray-500">Clinic Management</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-colors
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Role Badge */}
          <div className="p-4 border-t border-gray-200">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg">
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="text-gray-900 capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
