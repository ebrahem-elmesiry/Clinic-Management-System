"use client";

import React from "react";
import { Calendar, Users, Clock, CheckCircle } from "lucide-react";
import StatisticsCard from "@/shared/components/StatisticsCard";
import TodayAppointments from "@/role/doctor/components/dashboard/TodayAppointments";
import Notifications from "@/role/doctor/components/dashboard/Notifications";
import RecentPatients from "@/role/doctor/components/dashboard/RecentPatients";

export default function DoctorDashboard() {
  const stats = [
    {
      title: "Today's Appointments",
      value: '12',
      change: '+3 from yesterday',
      icon: Calendar,
      color: 'blue',
    },
    {
      title: 'Total Patients',
      value: '248',
      change: '+12 this week',
      icon: Users,
      color: 'teal',
    },
    {
      title: 'Pending Reviews',
      value: '8',
      change: '3 urgent',
      icon: Clock,
      color: 'orange',
    },
    {
      title: 'Completed Today',
      value: '7',
      change: '58% completion rate',
      icon: CheckCircle,
      color: 'green',
    },
  ] as const;

  const todaysAppointments = [
    { id: 1, time: '09:00 AM', patient: 'John Smith', reason: 'Regular Checkup', status: 'completed' as const },
    { id: 2, time: '09:30 AM', patient: 'Emma Johnson', reason: 'Follow-up', status: 'completed' as const },
    { id: 3, time: '10:00 AM', patient: 'Michael Brown', reason: 'Lab Results Review', status: 'in-progress' as const },
    { id: 4, time: '10:30 AM', patient: 'Sarah Davis', reason: 'Consultation', status: 'upcoming' as const },
    { id: 5, time: '11:00 AM', patient: 'James Wilson', reason: 'Physical Exam', status: 'upcoming' as const },
  ];

  const recentPatients = [
    { name: 'John Smith', lastVisit: '2 hours ago', condition: 'Stable', status: 'green' as const },
    { name: 'Emma Johnson', lastVisit: '3 hours ago', condition: 'Follow-up needed', status: 'yellow' as const },
    { name: 'Michael Brown', lastVisit: 'Today', condition: 'Under observation', status: 'orange' as const },
  ];

  const notifications = [
    { type: 'info' as const, message: 'Lab results available for Michael Brown', time: '10 min ago' },
    { type: 'warning' as const, message: 'Upcoming appointment in 30 minutes', time: '5 min ago' },
    { type: 'success' as const, message: 'Patient Emma Johnson checked out', time: '1 hour ago' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Good Morning, Dr. Sarah Johnson</h1>
        <p className="text-gray-600">Here's what's happening with your patients today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TodayAppointments appointments={todaysAppointments} />

        <div className="space-y-6">
          <Notifications notifications={notifications} />
          <RecentPatients patients={recentPatients} />
        </div>
      </div>
    </div>
  );
}
