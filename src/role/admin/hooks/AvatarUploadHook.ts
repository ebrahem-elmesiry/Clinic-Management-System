"use client";

import { useState } from "react";

export default function AvatarUploadHook() {
  const [avatar, setAvatar] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (avatar) URL.revokeObjectURL(avatar);
    setAvatar(URL.createObjectURL(file));
    e.target.value = "";
  }

  function handleRemove() {
    setAvatar(null);
  }

  return {
    avatar,
    handleFileChange,
    handleRemove,
  };
}