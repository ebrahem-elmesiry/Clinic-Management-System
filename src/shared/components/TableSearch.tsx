"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

interface TableSearchProps {
  placeholder?: string;
  className?: string;
}

export default function TableSearch({
  placeholder = "Search...",
  className,
}: TableSearchProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
      <Input placeholder={placeholder} className="pl-10" />
    </div>
  );
}
