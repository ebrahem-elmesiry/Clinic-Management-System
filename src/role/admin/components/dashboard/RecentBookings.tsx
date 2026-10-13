"use client";

import { Users } from "lucide-react";
import { Booking } from "../../types/type";
import WrapperComponent from "@/shared/components/WrapperComponent";

interface RecentBookingsProps {
  bookings: Booking[];
}

export default function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <WrapperComponent
      title="Recent Bookings"
      description="Latest appointment requests"
      className="lg:col-span-2"
    >
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-slate-100">
                  {booking.patient}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {booking.doctor} • {booking.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  booking.status === "confirmed"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-500"
                    : "bg-orange-100 dark:bg-orange-900/30 text-orange-700"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </WrapperComponent>
  );
}
