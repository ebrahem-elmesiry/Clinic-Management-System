"use client";

import { Stethoscope } from "lucide-react";
import { AuthTitleProps } from "../types/types";

export default function AuthTitle({ isLogin }: AuthTitleProps) {
  return (
    <>
      <div className="lg:hidden flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
          <Stethoscope className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-gray-900 dark:text-gray-100">HealthCare</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Clinic Management
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          {isLogin ? "Sign in to access your account" : "Register to get started"}
        </p>
      </div>
    </>
  );
}
