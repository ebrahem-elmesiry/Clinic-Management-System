"use client";

import React from "react";

interface AvatarTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function AvatarTitle({ title, subtitle, icon }: AvatarTitleProps) {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-teal-800 rounded-xl p-6 text-white">
      <div className="flex items-center gap-4">
        {icon ?? (
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-2xl">{title.charAt(0)}</span>
          </div>
        )}
        <div>
          <h1 className="text-2xl text-white mb-1">{title}</h1>
          {subtitle && <p className="text-blue-200">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
