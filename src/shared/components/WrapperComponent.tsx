"use client";

import React, { ReactNode } from "react";

interface WrapperComponentProps {
  children: React.ReactNode;
  className?: string;
  Button?: ReactNode;
  showButton?: boolean;
  title: string;
  description?: string;
}

export default function WrapperComponent({
  children,
  className,
  Button,
  showButton,
  title,
  description,
}: WrapperComponentProps) {
  return (
    <div className={className ?? ""}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              {description}
            </p>
          </div>
          {showButton && Button}
        </div>
        {children}
      </div>
    </div>
  );
}
