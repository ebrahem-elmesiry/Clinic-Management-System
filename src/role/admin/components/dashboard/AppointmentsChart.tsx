import WrapperComponent from "@/shared/components/WrapperComponent";
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
    <WrapperComponent
      title="Weekly Appointments"
      description="Current week statistics"
    >
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
    </WrapperComponent>
  );
}
