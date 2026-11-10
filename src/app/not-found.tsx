"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LayoutDashboard, Stethoscope } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { UserRole } from "@/shared/types/Roletype";

const roleHome: Record<UserRole, string> = {
  admin: "/admin/dashboard",
  doctor: "/doctor/dashboard",
  patient: "/patient/dashboard",
};

export default function NotFound() {
  const router = useRouter();
  const { role, isLoggedIn } = useAuth();
  const LoggedIn = isLoggedIn && role;
  const homeHref = LoggedIn ? roleHome[role] : "/login";

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-teal-500 shadow-lg">
          <Stethoscope className="h-10 w-10 text-white" />
        </div>

        <p className="mb-2 bg-linear-to-r from-blue-600 to-teal-600 bg-clip-text text-6xl text-transparent">
          404
        </p>

        <h1 className="mb-2 text-2xl text-gray-900 dark:text-gray-100">
          Page not found
        </h1>

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          The page you are looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back to the clinic.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1">
            <Link href={homeHref}>
              <LayoutDashboard />
              {LoggedIn ? "Back to Dashboard" : "Login"}
            </Link>
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            <ArrowLeft />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
