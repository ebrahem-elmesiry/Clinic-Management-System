"use client";

import AuthLeftSide from "./AuthLeftSide";
import AuthRightSide from "./AuthRightSide";
import useAuthPageHook from "../hooks/AuthPageHook";

export default function AuthPage() {
  const {
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
  } = useAuthPageHook();

  return (
    <div className="min-h-screen flex dark:bg-gray-950">
      {/* Left side - Branding */}
      <AuthLeftSide />

      {/* Right side - Login Form */}
      <AuthRightSide
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
