"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Department {
  name: string;
  value: number;
  color: string;
}

interface DepartmentsProps {
  data: Department[];
}

export default function Departments({ data }: DepartmentsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg text-gray-900">Departments</h2>
        <p className="text-sm text-gray-500">Patient distribution</p>
      </div>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {data.map((dept, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: dept.color }}
                ></div>
                <span className="text-sm text-gray-600">{dept.name}</span>
              </div>
              <span className="text-sm text-gray-900">{dept.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
