"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Role } from "@/role/admin/types/user-management";
import { specialties } from "../../constants/user-managment";

interface CommonData {
  firstName: string;
  lastName: string;
  password: string;
}

interface SecondFaceProps {
  commonData: CommonData;
  setCommonData: React.Dispatch<React.SetStateAction<CommonData>>;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  specialty: string;
  setSpecialty: (value: string) => void;
  role: Role | undefined;
  isEditing: boolean;
  isRoleDoctor: boolean;
  isRoleAdmin: boolean;
  isRolePatient: boolean;
  onCancel: () => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SecondFace({
  commonData,
  setCommonData,
  email,
  setEmail,
  phone,
  setPhone,
  specialty,
  setSpecialty,
  role,
  isEditing,
  isRoleDoctor,
  isRoleAdmin,
  isRolePatient,
  onCancel,
  onBack,
  onSubmit,
}: SecondFaceProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isEditing ? `Edit ${role}` : `Add ${role ?? "User"}`}
        </DialogTitle>
        {isEditing && <p className="text-xs text-gray-500">Role: {role}</p>}
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              className="mt-2"
              value={commonData.firstName}
              onChange={(e) =>
                setCommonData((p) => ({ ...p, firstName: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              className="mt-2"
              value={commonData.lastName}
              onChange={(e) =>
                setCommonData((p) => ({ ...p, lastName: e.target.value }))
              }
            />
          </div>
        </div>

        {isRoleDoctor && (
          <div>
            <Label htmlFor="specialty">Specialty / Department</Label>
            <Select
              value={specialties.find((s) => s.name === specialty)?.id}
              onValueChange={(value) =>
                setSpecialty(
                  specialties.find((s) => s.id === value)?.name ?? "",
                )
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {(isRoleAdmin || isRoleDoctor) && (
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="mt-2 disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEditing}
            />
          </div>
        )}

        {isRolePatient && (
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="01012345678"
              className="mt-2 disabled:opacity-50"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isEditing}
            />
          </div>
        )}

        {!isEditing && (
          <div>
            <Label htmlFor="password">Temporary password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-2"
              value={commonData.password}
              onChange={(e) =>
                setCommonData((p) => ({ ...p, password: e.target.value }))
              }
            />
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {isEditing ? (
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onBack}
            >
              Back
            </Button>
          )}
          <Button type="submit" className="flex-1">
            {isEditing ? "Save Changes" : "Add User"}
          </Button>
        </div>
      </form>
    </>
  );
}
