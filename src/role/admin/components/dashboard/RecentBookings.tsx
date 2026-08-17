"use client";

import React from "react";
import { Users } from "lucide-react";

interface Booking {
  id: number;
  patient: string;
  doctor: string;
  time: string;
  status: 'confirmed' | 'pending';
}

interface RecentBookingsProps {
  bookings: Booking[];
}

export default function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg text-gray-900">Recent Bookings</h2>
        <p className="text-sm text-gray-500">Latest appointment requests</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">{booking.patient}</p>
                  <p className="text-xs text-gray-500">
                    {booking.doctor} • {booking.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {booking.status}
                </span>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
