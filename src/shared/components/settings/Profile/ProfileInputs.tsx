"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface Profile {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  license: string;
  bio: string;
}

interface ProfileInputsProps {
  profile: Profile;
  userRole: string | null;
}

export default function ProfileInputs({
  profile,
  userRole,
}: ProfileInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          defaultValue={profile.name.split(" ")[0]}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          defaultValue={profile.name.split(" ").slice(1).join(" ")}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <div className="relative mt-2">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <Input
            id="email"
            type="email"
            defaultValue={profile.email}
            className="pl-9"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative mt-2">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <Input
            id="phone"
            type="tel"
            defaultValue={profile.phone}
            className="pl-9"
          />
        </div>
      </div>

      {(userRole === "doctor" || userRole === "admin") && (
        <>
          <div>
            <Label htmlFor="specialty">Specialty / Role</Label>
            <Input
              id="specialty"
              defaultValue={profile.specialty}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="license">License Number</Label>
            <Input
              id="license"
              defaultValue={profile.license}
              className="mt-2"
            />
          </div>
        </>
      )}

      {userRole === "patient" && (
        <>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              defaultValue="1979-01-15"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="bloodGroup">Blood Group</Label>
            <Input id="bloodGroup" defaultValue="O+" className="mt-2" />
          </div>
        </>
      )}

      <div className="md:col-span-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative mt-2">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <Input
            id="address"
            defaultValue="123 Main St, New York, NY 10001"
            className="pl-9"
          />
        </div>
      </div>

      {userRole === "doctor" && (
        <div className="md:col-span-2">
          <Label htmlFor="bio">Professional Bio</Label>
          <textarea
            id="bio"
            rows={3}
            defaultValue={profile.bio}
            className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      )}

      {userRole === "patient" && (
        <div className="md:col-span-2">
          <Label htmlFor="emergency">Emergency Contact</Label>
          <Input
            id="emergency"
            defaultValue="Jane Doe - (555) 987-6543"
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
}
