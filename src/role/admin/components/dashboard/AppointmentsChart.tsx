import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AppointmentsChartProps {
  data: { day: string; appointments: number }[];
}

export default function AppointmentsChart({ data }: AppointmentsChartProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <div className="mb-6">
        <h2 className="text-lg text-gray-900 dark:text-slate-100">
          Weekly Appointments
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Current week statistics
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border, #E5E7EB)"
          />
          <XAxis dataKey="day" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card, #fff)",
              border: "1px solid var(--border, #E5E7EB)",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="appointments" fill="#14B8A6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
