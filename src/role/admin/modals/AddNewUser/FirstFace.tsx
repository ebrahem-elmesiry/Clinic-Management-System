"use client";

import { Stethoscope, Shield, User } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Role } from "@/role/admin/types/user-management";

interface FirstFaceProps {
  role: Role | undefined;
  onSelectRole: (role: Role) => void;
  onCancel: () => void;
  onNext: () => void;
}

export default function FirstFace({
  role,
  onSelectRole,
  onCancel,
  onNext,
}: FirstFaceProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Select role</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => onSelectRole("doctor")}
          className={`flex flex-col items-center gap-2 p-6 border-2 rounded-xl h-auto w-full transition ${
            role === "doctor"
              ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
              : "border-gray-200 dark:border-slate-700"
          }`}
        >
          <Stethoscope
            className={`w-8 h-8 ${
              role === "doctor" ? "text-blue-600" : "text-gray-500"
            }`}
          />
          <span className="text-sm font-medium">Doctor</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => onSelectRole("admin")}
          className={`flex flex-col items-center gap-2 p-6 border-2 rounded-xl h-auto w-full transition ${
            role === "admin"
              ? "border-purple-600 bg-purple-50 dark:bg-purple-950/30"
              : "border-gray-200 dark:border-slate-700"
          }`}
        >
          <Shield
            className={`w-8 h-8 ${
              role === "admin" ? "text-purple-600" : "text-gray-500"
            }`}
          />
          <span className="text-sm font-medium">Admin</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => onSelectRole("patient")}
          className={`flex flex-col items-center gap-2 p-6 border-2 rounded-xl h-auto w-full transition ${
            role === "patient"
              ? "border-teal-600 bg-teal-50 dark:bg-teal-950/30"
              : "border-gray-200 dark:border-slate-700"
          }`}
        >
          <User
            className={`w-8 h-8 ${
              role === "patient" ? "text-teal-600" : "text-gray-500"
            }`}
          />
          <span className="text-sm font-medium">Patient</span>
        </Button>
      </div>
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="flex-1"
          onClick={onNext}
          disabled={!role}
        >
          Next
        </Button>
      </div>
    </>
  );
}
