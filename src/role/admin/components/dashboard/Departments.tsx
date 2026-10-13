import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import WrapperComponent from "@/shared/components/WrapperComponent";

interface Department {
  name: string;
  value: number;
}

interface DepartmentsProps {
  data: Department[];
}

export default function Departments({ data }: DepartmentsProps) {
  const departmentColor = [
    "#3B82F6",
    "#14B8A6",
    "#F59E0B",
    "#8B5CF6",
    "#6B7280",
  ];
  return (
    <WrapperComponent title="Departments" description="Patient distribution">
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
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={departmentColor[index]} />
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
                  style={{ backgroundColor: departmentColor[index] }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-slate-300">
                  {dept.name}
                </span>
              </div>
              <span className="text-sm text-gray-900 dark:text-slate-100">
                {dept.value}%
              </span>
            </div>
          ))}
        </div>
    </WrapperComponent>
  );
}
