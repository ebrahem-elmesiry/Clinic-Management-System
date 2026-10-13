"use client";

import { Suspense } from "react";
import UserManagementPage from "@/role/admin/components/UserManagement/UserManagementPage";

export default function AdminUserManagementRoute() {
  return (
    <Suspense fallback={null}>
      <UserManagementPage />
    </Suspense>
  );
}
