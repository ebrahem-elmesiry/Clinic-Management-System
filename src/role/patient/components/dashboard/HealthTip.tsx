"use client";

import React from "react";
import { Heart } from "lucide-react";

export default function HealthTip() {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl border border-teal-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-teal-600" />
        <h3 className="text-gray-900">Health Tip</h3>
      </div>
      <p className="text-sm text-gray-700 mb-4">
        Remember to take your medications on time and maintain a healthy
        lifestyle with regular exercise and balanced diet.
      </p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white p-2 rounded text-center">
          <p className="text-teal-600 mb-1">💧 Hydration</p>
          <p className="text-gray-600">8 glasses/day</p>
        </div>
        <div className="bg-white p-2 rounded text-center">
          <p className="text-teal-600 mb-1">🏃 Exercise</p>
          <p className="text-gray-600">30 min/day</p>
        </div>
      </div>
    </div>
  );
}
