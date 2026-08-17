"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface AddNewUserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddNewUser({ open, onOpenChange }: AddNewUserProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="John Doe" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="role">User Role</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="patient">Patient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="specialty">Specialty / Department</Label>
            <Input id="specialty" placeholder="e.g., Cardiologist" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="(555) 123-4567" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="password">Temporary Password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="mt-2" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="sendEmail" className="rounded border-gray-300" />
            <Label htmlFor="sendEmail" className="text-sm text-gray-600">
              Send welcome email with login credentials
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Add User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
