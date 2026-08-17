"use client";

import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  placeholder?: string;
  searchSidebar?: boolean;
}

export default function Search({
  searchSidebar = false,
  placeholder = "Search patients, appointments...",
}: SearchProps) {
  return (
    <div
      className={`relative w-full max-w-md ${searchSidebar ? "sm:hidden" : "max-sm:hidden"}`}
    >
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
