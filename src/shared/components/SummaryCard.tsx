"use client";

import React from "react";

interface SummaryCardProps {
  title?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function SummaryCard({
  title,
  content,
  footer,
  className,
}: SummaryCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${className ?? ""}`}>
      {title && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg text-gray-900 dark:text-gray-100">{title}</h2>
        </div>
      )}
      <div className="p-6">{content}</div>
      {footer && <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700">{footer}</div>}
    </div>
  );
}
