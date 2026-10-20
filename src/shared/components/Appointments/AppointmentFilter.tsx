"use client";

import TableSearch from "@/shared/components/TableSearch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { APPOINTMENT_STATUSES } from "@/role/admin/constants/appointments";
import AppointmentFilterHook from "@/shared/hooks/AppointmentFilterHook";
import { useAuth } from "@/providers/AuthProvider";

export default function AppointmentFilter() {
  const { search, setSearch, view, handleSearch, handleFilter, handleView } =
    AppointmentFilterHook();
  const { role } = useAuth();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-50">
          <TableSearch
            placeholder="Search appointments..."
            value={search}
            onChange={setSearch}
            onSubmit={handleSearch}
          />
        </div>
        {role === "admin" && (
          <Select onValueChange={(value) => handleFilter("doctor", value)}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Filter by Doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Doctors</SelectItem>
              <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
              <SelectItem value="dr-chen">Dr. Michael Chen</SelectItem>
              <SelectItem value="dr-lee">Dr. Robert Lee</SelectItem>
            </SelectContent>
          </Select>
        )}
        <Select onValueChange={(value) => handleFilter("status", value)}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {APPOINTMENT_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
          <Button
            variant={view === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleView("calendar")}
          >
            Calendar
          </Button>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleView("list")}
          >
            List
          </Button>
        </div>
      </div>
    </div>
  );
}
