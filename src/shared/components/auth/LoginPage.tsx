"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, User, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useAuth } from "@/providers/AuthProvider";

type UserRole = "doctor" | "admin" | "patient";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>("doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    login(selectedRole);
    toast.success(isLogin ? "Welcome back!" : "Account created successfully.");
    const roleHome: Record<UserRole, string> = {
      doctor: "/doctor/dashboard",
      admin: "/admin/dashboard",
      patient: "/patient/dashboard",
    };
    router.push(roleHome[selectedRole]);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 p-12 flex-col justify-between">
        <div className="flex items-center gap-3 text-white">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl text-white">HealthCare</h1>
            <p className="text-sm text-blue-100">Clinic Management System</p>
          </div>
        </div>

        <div className="space-y-6 text-white">
          <h2 className="text-4xl">Modern Healthcare Management Solution</h2>
          <p className="text-lg text-blue-100">
            Streamline your clinic operations with our comprehensive management
            system. Manage appointments, patient records, prescriptions, and
            billing all in one place.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl mb-1">500+</p>
              <p className="text-sm text-blue-100">Clinics</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl mb-1">50K+</p>
              <p className="text-sm text-blue-100">Patients</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl mb-1">1K+</p>
              <p className="text-sm text-blue-100">Doctors</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl mb-1">99.9%</p>
              <p className="text-sm text-blue-100">Uptime</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-blue-100">
          © 2024 HealthCare. All rights reserved.
        </p>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Logo for mobile */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">HealthCare</h1>
                <p className="text-xs text-gray-500">Clinic Management</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-500">
                {isLogin
                  ? "Sign in to access your account"
                  : "Register to get started"}
              </p>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <Label className="mb-3 block text-gray-700">Login as</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["doctor", "patient", "admin"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`
                      p-3 rounded-lg border-2 transition-all
                      ${
                        selectedRole === role
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }
                    `}
                  >
                    <User className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-xs capitalize">{role}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs for Login/Register */}
            <Tabs
              value={isLogin ? "login" : "register"}
              onValueChange={(v) => setIsLogin(v === "login")}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="doctor@example.com"
                        value={"qweqweqwqweqwe@gmail.com"}
                        // value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        aria-invalid={!!errors.email}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-gray-700">
                      Password
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={"qwaeqweqweqweqweqw"}
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        aria-invalid={!!errors.password}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <Label htmlFor="fullname" className="text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="fullname"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reg-email" className="text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="doctor@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reg-password" className="text-gray-700">
                      Password
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="text-center text-sm text-gray-500">
              By continuing, you agree to our{" "}
              <button className="text-blue-600 hover:text-blue-700">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
