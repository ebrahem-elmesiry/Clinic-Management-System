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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import {
  PatientInformationType,
  PatientProfile,
} from "../types/patientRecords";
import { toast } from "sonner";
import { FormData, patientSchema } from "../validations/settings/validation";

interface Props {
  setPatients: Dispatch<SetStateAction<PatientInformationType[]>>;
  setPatientProfiles: Dispatch<SetStateAction<PatientProfile[]>>;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  birthDay: "",
  gender: "",
  phone: "",
  address: "",
  bloodGroup: "",
};

export default function AddPatientModal({
  setPatients,
  setPatientProfiles,
}: Props) {
  const searchParams = useSearchParams();
  const isModalOpen = searchParams.has("modal");
  const router = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState<FormData>(initialFormData);

  function handleOpenModal() {
    if (!isModalOpen) {
      const p = new URLSearchParams(searchParams.toString());
      p.set("modal", "add");
      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    }
  }
  function handleCloseModal() {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("modal");
    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function resetForm() {
    setFormData(initialFormData);
  }

  const updateField = <K extends keyof FormData>(field: K, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  function calcAge(birthDayValue: string): number {
    if (!birthDayValue) return 0;
    const birth = new Date(birthDayValue);
    if (Number.isNaN(birth.getTime())) return 0;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return Math.max(0, age);
  }

  function handleAddPatient(e: React.FormEvent) {
    e.preventDefault();
    const result = patientSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    const valid = result.data;
    const fullName =
      `${valid.firstName.trim()} ${valid.lastName.trim()}`.trim();
    // const PatientId = crypto.randomUUID()
    const PatientId = String(Date.now());
    const newPatient: PatientInformationType = {
      id: PatientId,
      name: fullName,
      age: calcAge(valid.birthDay),
      gender: valid.gender,
      lastVisit: "Unknown",
    };

    const newPatientProfile: PatientProfile = {
      id: PatientId,
      name: fullName,
      age: calcAge(valid.birthDay),
      gender: valid.gender,
      phone: valid.phone,
      dob: valid.birthDay,
      address: valid.address,
      bloodGroup: valid.bloodGroup,
    };

    setPatients((prev) => [...prev, newPatient]);
    setPatientProfiles((prev) => [...prev, newPatientProfile]);
    resetForm();
    handleCloseModal();
  }

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseModal();
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={handleOpenModal}>
          <Plus className="w-5 h-5 mr-2" />
          Add New Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddPatient} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                className="mt-2"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Smith"
                className="mt-2"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthDay">Birth Date</Label>
              <Input
                id="birthDay"
                type="date"
                className="mt-2"
                value={formData.birthDay}
                onChange={(e) => updateField("birthDay", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(v) => updateField("gender", v)}
              >
                <SelectTrigger id="gender" className="mt-2">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="01012345678"
                className="mt-2"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Main St, City, State ZIP"
                className="mt-2"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="bloodGroup">Blood Group</Label>
            <Select
              value={formData.bloodGroup}
              onValueChange={(v) => updateField("bloodGroup", v)}
            >
              <SelectTrigger id="bloodGroup" className="mt-2">
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                resetForm();
                handleCloseModal();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Patient
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
