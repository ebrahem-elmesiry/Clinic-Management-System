import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "@/shared/components/ui/calendar";
import type { FollowUpAppointment } from "@/role/doctor/types/type";

interface ScheduleData {
  date: string;
  time: string;
  specialty: string;
}

interface AppointmentDetails {
  patientName: string;
  type: string;
  notes: string;
}

interface AddNewAppointmentModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  patientName?: string;
  specialty?: string;
  appointmentType?: string;
  showTrigger?: boolean;
  onSchedule?: (data: FollowUpAppointment) => void;
}

export default function AddNewAppointmentModal({
  open,
  onOpenChange,
  patientName,
  specialty,
  appointmentType,
  showTrigger = true,
  onSchedule,
}: AddNewAppointmentModalProps) {
  const [schedule, setSchedule] = useState<ScheduleData>({
    date: "",
    time: "",
    specialty: specialty ?? "",
  });
  const [details, setDetails] = useState<AppointmentDetails>({
    patientName: patientName ?? "",
    type: appointmentType ?? "",
    notes: "",
  });

  const handleScheduleChange = (field: keyof ScheduleData, value: string) =>
    setSchedule((prev) => ({ ...prev, [field]: value }));

  const handleDetailsChange = (
    field: keyof AppointmentDetails,
    value: string,
  ) => setDetails((prev) => ({ ...prev, [field]: value }));

  function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    onSchedule?.({
      patientName: details.patientName,
      specialty: schedule.specialty,
      date: schedule.date,
      time: schedule.time,
      type: details.type,
      notes: details.notes,
    });
    onOpenChange?.(false);
    toast.success("Appointment scheduled successfully.");
  }

  const disabledDates = ["2026-08-28", "2026-08-30"];

  const disabledTimes = ["10:00", "11:00"];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            New Appointment
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-md max-h-170 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSchedule} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="patient">Patient Name</Label>
            <Input
              id="patient"
              placeholder="Select or search patient"
              className="mt-2"
              value={details.patientName}
              onChange={(e) =>
                handleDetailsChange("patientName", e.target.value)
              }
            />
          </div>
          <div>
            <Label htmlFor="specialty">Specialty</Label>
            <Select
              value={schedule.specialty}
              onValueChange={(value) =>
                handleScheduleChange("specialty", value)
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Physician">
                  General Physician
                </SelectItem>
                <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                <SelectItem value="Dermatologist">Dermatologist</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => {
                if (!schedule.specialty)
                  toast.info("Please Choose Specialty First");
              }}
            >
              <Label htmlFor="date">Date</Label>
              <Calendar
                mode="single"
                selected={schedule.date ? parseISO(schedule.date) : undefined}
                onSelect={(date) => {
                  if (date) {
                    handleScheduleChange("date", format(date, "yyyy-MM-dd"));
                  }
                }}
                disabled={(date) =>
                  disabledDates.some(
                    (disabledDate) =>
                      format(date, "yyyy-MM-dd") === disabledDate,
                  )
                }
              />
            </div>
            <div
              onClick={() => {
                if (!schedule.date) toast.info("Please Choose Date First");
              }}
            >
              <Label htmlFor="time">Time</Label>
              <Input
                disabled={!schedule.date}
                id="time"
                type="time"
                className="mt-2"
                value={schedule.time}
                onChange={(e) => handleScheduleChange("time", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="type">Appointment Type</Label>
            <Select
              value={details.type}
              onValueChange={(value) => handleDetailsChange("type", value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checkup">Regular Checkup</SelectItem>
                <SelectItem value="followup">Follow-up</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <textarea
              id="notes"
              rows={3}
              className="w-full mt-2 px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Add any additional notes..."
              value={details.notes}
              onChange={(e) => handleDetailsChange("notes", e.target.value)}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Schedule
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
