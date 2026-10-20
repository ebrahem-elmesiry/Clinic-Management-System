"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import AuthTitle from "./AuthTitle";
import RoleSelection from "./RoleSelection";
import LogIn from "./LogIn";
import Register from "./Register";
import { AuthRightSideProps } from "../types/types";

export default function AuthRightSide({
  isLogin,
  setIsLogin,
  selectedRole,
  setSelectedRole,
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}: AuthRightSideProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <AuthTitle isLogin={isLogin} />

          <RoleSelection
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />

          <Tabs
            value={isLogin ? "login" : "register"}
            onValueChange={(v) => setIsLogin(v === "login")}
            className="mb-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <LogIn
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleSubmit}
            />

            <Register
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleSubmit}
            />
          </Tabs>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            By continuing, you agree to our{" "}
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
