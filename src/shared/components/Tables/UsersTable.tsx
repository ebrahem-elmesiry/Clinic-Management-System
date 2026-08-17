"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";
import { Button } from "@/shared/components/ui/button";

interface UserRecord {
  id: number;
  name: string;
  email: string;
  role: string;
  specialty: string;
  status: string;
  joinDate: string;
  patients: number;
}

interface UsersTableProps {
  users: UserRecord[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">User</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">Role</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">Specialty</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">Status</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">Join Date</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">Patients</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={user.role} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{user.specialty}</td>
              <td className="px-6 py-4">
                <StatusBadge status={user.status} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.joinDate}</td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {user.role === 'doctor' ? user.patients : '-'}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Button variant="outline" size="xs">Permissions</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
