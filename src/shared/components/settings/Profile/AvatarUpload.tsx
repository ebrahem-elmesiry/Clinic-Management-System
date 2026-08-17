"use client";

import React from "react";
import { Camera, User } from "lucide-react";

interface AvatarUploadProps {
  name: string;
  userRole: string | null;
}

export default function AvatarUpload({ name, userRole }: AvatarUploadProps) {
  return (
    <div className="flex items-center gap-6 mb-8">
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
          <User className="w-12 h-12 text-white" />
        </div>
        <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 shadow-md">
          <Camera className="w-4 h-4" />
        </button>
      </div>
      <div>
        <h3 className="text-gray-900 dark:text-slate-100 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 capitalize mb-3">
          {userRole} Account
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Upload Photo
          </button>
          <button className="px-4 py-2 text-sm border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-slate-400 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
