"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm text-gray-600">User</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600">Role</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600">Specialty</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600">Join Date</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600">Patients</th>
            <th className="px-6 py-4 text-left text-sm text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  user.role === 'doctor' ? 'bg-blue-100 text-blue-700' :
                  user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                  'bg-teal-100 text-teal-700'
                }`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{user.specialty}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  user.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {user.role === 'doctor' ? user.patients : '-'}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    Permissions
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
