"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      aria-label="Toggle dark mode"
    >
      <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400 scale-100 transition-all dark:hidden" />
      <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 hidden transition-all dark:block" />
    </button>
  );
}
