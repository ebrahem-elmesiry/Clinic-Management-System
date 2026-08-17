"use client";

import React, { useState } from "react";
import { Search, UserCheck, UserX, Shield } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import PageTitleWithButton from "@/shared/components/page-title/PageTitleWithButton";
import TableSearch from "@/shared/components/TableSearch";
import StatisticsCard from "@/shared/components/StatisticsCard";
import UsersTable from "@/shared/components/Tables/UsersTable";
import AddNewUser from "@/role/admin/modals/AddNewUser";

const users = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@clinic.com",
    role: "doctor",
    specialty: "General Physician",
    status: "active",
    joinDate: "Jan 15, 2023",
    patients: 248,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    email: "michael.chen@clinic.com",
    role: "doctor",
    specialty: "Cardiologist",
    status: "active",
    joinDate: "Mar 20, 2023",
    patients: 185,
  },
  {
    id: 3,
    name: "Dr. Robert Lee",
    email: "robert.lee@clinic.com",
    role: "doctor",
    specialty: "Pediatrician",
    status: "active",
    joinDate: "May 10, 2023",
    patients: 312,
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@clinic.com",
    role: "admin",
    specialty: "System Administrator",
    status: "active",
    joinDate: "Jan 1, 2023",
    patients: 0,
  },
  {
    id: 5,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    role: "patient",
    specialty: "N/A",
    status: "active",
    joinDate: "Jun 5, 2024",
    patients: 0,
  },
  {
    id: 6,
    name: "Dr. Emily White",
    email: "emily.white@clinic.com",
    role: "doctor",
    specialty: "Dermatologist",
    status: "inactive",
    joinDate: "Feb 12, 2023",
    patients: 142,
  },
];

const roleStats = [
  { role: "Doctors", count: 24, icon: UserCheck, color: "blue" },
  { role: "Admins", count: 3, icon: Shield, color: "purple" },
  { role: "Patients", count: 1284, icon: UserCheck, color: "teal" },
  { role: "Inactive", count: 5, icon: UserX, color: "red" },
];

const permissions = {
  doctor: ["View Patients", "Create Prescriptions", "Manage Appointments"],
  admin: ["All Permissions", "User Management", "System Settings", "Financial Reports"],
  patient: ["View Own Records", "Book Appointments", "View Prescriptions"],
};

export default function UserManagementPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");

  const filteredUsers = selectedRole === "all"
    ? users
    : users.filter((user) => user.role === selectedRole);

  return (
    <div className="p-8 space-y-6">
      <PageTitleWithButton
        title="User Management"
        subtitle="Manage users, roles, and permissions"
        action={<AddNewUser open={showAddDialog} onOpenChange={setShowAddDialog} />}
      />

      {/* Role Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roleStats.map((stat, index) => (
          <StatisticsCard
            key={index}
            title={stat.role}
            value={String(stat.count)}
            icon={stat.icon}
            color={stat.color as "blue" | "purple" | "teal" | "red"}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <TableSearch placeholder="Search users..." />
          </div>
          <div className="flex gap-2">
            {["all", "doctor", "admin", "patient"].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  selectedRole === role
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {role === "all" ? "All Users" : role.charAt(0).toUpperCase() + role.slice(1) + "s"}
              </button>
            ))}
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <UsersTable users={filteredUsers} />

      {/* Role Permissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg text-gray-900">Doctor Permissions</h3>
          </div>
          <div className="space-y-2">
            {permissions.doctor.map((perm, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{perm}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg text-gray-900">Admin Permissions</h3>
          </div>
          <div className="space-y-2">
            {permissions.admin.map((perm, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>{perm}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg text-gray-900">Patient Permissions</h3>
          </div>
          <div className="space-y-2">
            {permissions.patient.map((perm, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span>{perm}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
