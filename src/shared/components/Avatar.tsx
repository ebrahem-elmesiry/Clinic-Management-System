"use client";

import React from "react";
import { User } from "lucide-react";

interface AvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  src?: string;
  alt?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-20 h-20",
  xl: "w-24 h-24",
};

const iconClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
  xl: "w-12 h-12",
};

export default function Avatar({
  size = "md",
  className,
  src,
  alt,
}: AvatarProps) {
  return (
    <div
      className={`overflow-hidden bg-gradient-to-br from-blue-500 to-teal-500 dark:from-blue-600 dark:to-teal-600 rounded-full flex items-center justify-center ${sizeClasses[size]} ${className ?? ""}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? "avatar"}
          className="w-full h-full object-cover"
        />
      ) : (
        <User className={`text-white ${iconClasses[size]}`} />
      )}
    </div>
  );
}
