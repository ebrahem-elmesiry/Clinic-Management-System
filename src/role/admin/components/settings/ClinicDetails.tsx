import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Clock, Phone, Stethoscope } from "lucide-react";
import { ClinicType } from "@/shared/types/appointment";
import { ClinicFieldType } from "@/role/admin/types/clinicInfo";

interface ClinicDetailsProps {
  clinicInfo: ClinicType;
  onChange: (
    value: string,
    type: ClinicFieldType,
    timeType?: "start" | "end",
  ) => void;
}

export default function ClinicDetails({
  clinicInfo,
  onChange,
}: ClinicDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="md:col-span-2">
        <Label htmlFor="clinicName">Clinic Name</Label>
        <div className="relative mt-2">
          <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <Input
            id="clinicName"
            value={clinicInfo.name}
            onChange={(e) => onChange(e.target.value, "name")}
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <div className="relative mt-2">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <Input
            id="phone"
            value={clinicInfo.phone}
            onChange={(e) => onChange(e.target.value, "phone")}
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="startTime">Working Hours Start</Label>
        <div className="relative mt-2">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <Input
            id="startTime"
            type="time"
            value={clinicInfo.openingTime}
            onChange={(e) => onChange(e.target.value, "time", "start")}
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="endTime">Working Hours End</Label>
        <div className="relative mt-2">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <Input
            id="endTime"
            type="time"
            value={clinicInfo.closingTime}
            onChange={(e) => onChange(e.target.value, "time", "end")}
            className="pl-9"
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          rows={3}
          value={clinicInfo.description}
          onChange={(e) => onChange(e.target.value, "description")}
          className="w-full mt-2 px-3 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Clinic description"
        />
      </div>
    </div>
  );
}
