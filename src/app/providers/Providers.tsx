"use client";

import { useAuth } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Header from "@/shared/components/header/Header";
import Sidebar from "@/shared/components/sidebar/Sidebar";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster richColors position="top-right" />
      {isLoggedIn ? (
        <>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:outline-none"
          >
            Skip to main content
          </a>
          <Header />
          <div className="flex min-h-screen">
            <Sidebar />
            <main
              id="main-content"
              className="md:ml-60 flex-1 p-6 min-w-0 max-sm:p-4 bg-slate-50 dark:bg-slate-900"
            >
              {children}
            </main>
          </div>
        </>
      ) : (
        <main id="main-content" className="bg-slate-50 dark:bg-slate-900">
          {children}
        </main>
      )}
    </ThemeProvider>
  );
}
