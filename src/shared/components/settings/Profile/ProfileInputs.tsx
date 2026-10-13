"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import ProfileInputsHook from "@/role/admin/hooks/ProfileInputsHook";
import { Profile, UserRole } from "@/shared/types/type";

interface ProfileInputsProps {
  profile: Profile;
  userRole: UserRole;
}

export default function ProfileInputs({
  profile,
  userRole,
}: ProfileInputsProps) {
  const {
    name,
    setNameData,
    email,
    setEmailData,
    specialty,
    patientInfo,
    setPatientInfoData,
    handleSave,
  } = ProfileInputsHook(profile, userRole);

  const showDoctorFields = userRole === "doctor";
  const showPatientFields = userRole === "patient";

  return (
    <form onSubmit={handleSave}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={name.first}
            onChange={(e) => setNameData("first", e.target.value)}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={name.last}
            onChange={(e) => setNameData("last", e.target.value)}
            className="mt-2"
          />
        </div>

        {!showPatientFields && (
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmailData(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        )}
        {showPatientFields && (
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative mt-2">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
              <Input
                id="phone"
                type="tel"
                value={patientInfo?.phone}
                onChange={(e) => setPatientInfoData("phone", e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        )}

        {showDoctorFields && (
          <>
            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                disabled
                id="specialty"
                value={specialty}
                className="mt-2"
              />
            </div>
          </>
        )}

        {showPatientFields && (
          <>
            <div>
              <Label htmlFor="date">Date of Birth</Label>
              <Input
                id="date"
                type="date"
                value={patientInfo?.date}
                onChange={(e) => setPatientInfoData("date", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Input
                id="bloodGroup"
                value={patientInfo?.blood}
                onChange={(e) => setPatientInfoData("blood", e.target.value)}
                className="mt-2"
              />
            </div>
          </>
        )}
        {showPatientFields && (
          <div>
            <Label htmlFor="address">Address</Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-slate-500" />
              <Input
                id="address"
                value={patientInfo?.address}
                onChange={(e) => setPatientInfoData("address", e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
