"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { UserRecord } from "@/role/admin/types/user-management";
import AddNewUserHook from "@/role/admin/hooks/AddNewUserHook";
import FirstFace from "./FirstFace";
import SecondFace from "./SecondFace";

interface AddNewUserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingUser?: UserRecord | null;
  onSaveUser?: (user: UserRecord) => void;
  onClearEdit?: () => void;
  face: 1 | 2;
  setFace: (face: 1 | 2) => void;
  setAddUserOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddNewUser(props: AddNewUserProps) {
  const {
    open,
    face,
    commonData,
    setCommonData,
    email,
    setEmail,
    phone,
    setPhone,
    specialty,
    setSpecialty,
    role,
    setRole,
    isEditing,
    isRoleDoctor,
    isRoleAdmin,
    isRolePatient,
    handleOpenChange,
    handleCreateClick,
    handleNext,
    handleBack,
    handleSubmit,
  } = AddNewUserHook(props);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* <DialogTrigger asChild> */}
      <Button onClick={handleCreateClick}>
        <Plus className="w-5 h-5 mr-2" />
        Add New User
      </Button>
      {/* </DialogTrigger> */}
      <DialogContent className="max-w-md">
        {face === 1 && !isEditing ? (
          <FirstFace
            role={role}
            onSelectRole={setRole}
            onCancel={() => handleOpenChange(false)}
            onNext={handleNext}
          />
        ) : (
          <SecondFace
            commonData={commonData}
            setCommonData={setCommonData}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            specialty={specialty}
            setSpecialty={setSpecialty}
            role={role}
            isEditing={isEditing}
            isRoleDoctor={isRoleDoctor}
            isRoleAdmin={isRoleAdmin}
            isRolePatient={isRolePatient}
            onCancel={() => handleOpenChange(false)}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
