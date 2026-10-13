"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

interface TableSearchProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (text: string) => void;
}

export default function TableSearch({
  placeholder = "Search...",
  className,
  value,
  onChange,
  onSubmit,
}: TableSearchProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(value ?? "");
  }

  return (
    <form className={`relative ${className ?? ""}`} onSubmit={handleSubmit}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
      <Input
        placeholder={placeholder}
        className="pl-10"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </form>
  );
}
