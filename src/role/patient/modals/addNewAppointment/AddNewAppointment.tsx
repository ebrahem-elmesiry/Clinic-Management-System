"use client";

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
import { TimePicker, TimePickerPanel } from "@/components/reui/time-picker";

import { Label } from "@/shared/components/ui/label";
import { format, parseISO } from "date-fns";
import { Plus } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
import { Card } from "@/shared/components/ui/card";
import useAddNewAppointment from "./useAddNewAppointment";
import { UseAddNewAppointmentProps } from "../../types/appointment";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AddNewAppointmentModal(
  props: UseAddNewAppointmentProps,
) {
  const {
    open,
    onOpenChange,
    showTrigger,
    schedule,
    setSchedule,
    details,
    handleDetailsChange,
    handleScheduleChange,
    workTime,
    handleBusyAppointment,
    handleSchedule,
    empty,
    specialties,
    appointmentReasons,
    specialty_price,
  } = useAddNewAppointment(props);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          empty();
        }
        onOpenChange?.(isOpen);
      }}
    >
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
              value={schedule.specialty_id}
              onValueChange={(value) =>
                handleScheduleChange("specialty_id", value)
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty: any) => (
                  <SelectItem key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div
              onClick={() => {
                if (!schedule.specialty_id) {
                  toast.info("please choose specialty first");
                  return;
                }
              }}
            >
              <Label htmlFor="date">Date</Label>
              <Calendar
                classNames={{
                  today:
                    "bg-gray-200 dark:bg-slate-700 rounded-md text-gray-900 dark:text-white",
                  day_button:
                    "hover:bg-gray-100 dark:hover:bg-slate-700 data-[selected-single=true]:bg-black data-[selected-single=true]:text-white data-[selected-single=true]:hover:bg-black dark:data-[selected-single=true]:bg-white dark:data-[selected-single=true]:text-black dark:data-[selected-single=true]:hover:bg-white data-[today=true]:data-[selected-single=true]:bg-black data-[today=true]:data-[selected-single=true]:text-white dark:data-[today=true]:data-[selected-single=true]:bg-white dark:data-[today=true]:data-[selected-single=true]:text-black",
                }}
                hideNavigation={!schedule.specialty_id}
                mode="single"
                selected={schedule.date ? parseISO(schedule.date) : undefined}
                onSelect={(date) => {
                  if (date) {
                    handleScheduleChange("date", format(date, "yyyy-MM-dd"));
                  }
                }}
                disabled={(date) =>
                  !schedule.specialty_id ||
                  !props.clinicInfo.working_days.includes(date.getDay())
                }
              />
            </div>
            <div
              onClick={() => {
                if (!schedule.date) {
                  toast.info("please choose date first");
                  return;
                }
              }}
              className="flex flex-col gap-4"
            >
              <Label id="Choose Time">Time</Label>
              <Card className="w-fit py-0">
                <TimePicker
                  min={workTime.start}
                  max={workTime.end}
                  value={schedule.time}
                  onValueChange={(v: string | null) =>
                    setSchedule((prev: any) => ({
                      ...prev,
                      time: v,
                    }))
                  }
                  disabled={!schedule.date}
                  isTimeDisabled={(v: string) => handleBusyAppointment(v)}
                  aria-label="Choose Time"
                  hourCycle={12}
                >
                  <TimePickerPanel
                    autoCapitalize={"words"}
                    className={cn(
                      !schedule.date ? "opacity-35" : "opacity-100",
                    )}
                  />
                </TimePicker>
              </Card>
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
                {appointmentReasons?.map((reason: any) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium">Appointment Price</p>
              <p className="text-xs text-muted-foreground">
                Total amount for this appointment
              </p>
            </div>

            <p className="text-lg font-semibold">{specialty_price} EGP</p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                onOpenChange?.(false);
                empty();
              }}
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
