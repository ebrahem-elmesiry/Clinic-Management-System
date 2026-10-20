"use client";

import { Lock, Mail, User } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { TabsContent } from "@/shared/components/ui/tabs";
import { RegisterProps } from "../types/types";

export default function Register({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}: RegisterProps) {
  return (
    <TabsContent value="register">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <Label
            htmlFor="fullname"
            className="text-gray-700 dark:text-gray-300"
          >
            Full Name
          </Label>
          <div className="relative mt-2">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <Input
              id="fullname"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label
            htmlFor="reg-email"
            className="text-gray-700 dark:text-gray-300"
          >
            Email Address
          </Label>
          <div className="relative mt-2">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <Input
              id="reg-email"
              type="email"
              placeholder="doctor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label
            htmlFor="reg-password"
            className="text-gray-700 dark:text-gray-300"
          >
            Password
          </Label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <Input
              id="reg-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </TabsContent>
  );
}
