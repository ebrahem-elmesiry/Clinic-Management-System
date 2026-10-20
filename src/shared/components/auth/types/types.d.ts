import { FormEvent } from "react";
import { UserRole } from "@/shared/types/type";

export interface AuthRightSideProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
}

export interface AuthTitleProps {
  isLogin: boolean;
}

export interface RoleSelectionProps {
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
}

export interface LogInProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export interface RegisterProps {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;

  onSubmit: (e: FormEvent) => void;
}
