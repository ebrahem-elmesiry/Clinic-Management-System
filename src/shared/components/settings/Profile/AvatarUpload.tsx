"use client";

import { Camera, User } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import AvatarUploadHook from "@/role/admin/hooks/AvatarUploadHook";
import Image from "next/image";

interface AvatarUploadProps {
  userName: { firstName: string; lastName: string };
  userRole: string | null;
}

export default function AvatarUpload({
  userName,
  userRole,
}: AvatarUploadProps) {
  const { avatar, handleFileChange, handleRemove } = AvatarUploadHook();

  return (
    <div className="flex items-center max-sm:flex-col gap-6 mb-8">
      <div className="relative">
        <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center overflow-hidden">
          {avatar ? (
            <Image
              priority
              src={avatar}
              width={200}
              height={200}
              alt={userName.firstName + " " + userName.lastName}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-white" />
          )}
        </div>
        <Label
          htmlFor="image-avatar"
          className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 shadow-md cursor-pointer"
        >
          <Camera className="w-4 h-4" />
        </Label>
      </div>
      <div>
        <h3 className="text-gray-900 dark:text-slate-100 mb-1">
          {userName.firstName + " " + userName.lastName}
        </h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 capitalize mb-3">
          {userRole} Account
        </p>
        <div className="flex flex-wrap gap-2">
          <Input
            type="file"
            id="image-avatar"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
          <Label
            htmlFor="image-avatar"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Upload Photo
          </Label>
          <Button variant="outline" onClick={handleRemove} disabled={!avatar}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
