"use client";

import { Edit, Trash2 } from "lucide-react";
import StatusBadge from "@/shared/components/Appointments/StatusBadge";
import {
  adminRecord,
  doctorRecord,
  UserRecord,
} from "@/role/admin/types/user-management";

interface UsersTableProps {
  users: UserRecord[];
  onEdit: (user: UserRecord) => void;
  onDelete: (id: string) => void;
}

export default function UsersTable({
  users,
  onEdit,
  onDelete,
}: UsersTableProps) {
  function isDoctor(user: UserRecord): user is doctorRecord {
    return user.role === "doctor";
  }

  function isAdmin(user: UserRecord): user is adminRecord {
    return user.role === "admin";
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
      <table className="min-w-160">
        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
              User
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
              Role
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
              Specialty
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
              Join Date
            </th>
            <th className="px-6 py-4 text-left text-sm text-gray-600 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isDoctor(user) || isAdmin(user) ? user.email : user.phone}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={user.role} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {isDoctor(user) ? user.specialty : "N/A"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {user.joinDate}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                    aria-label="Edit user"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                    aria-label="Delete user"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
