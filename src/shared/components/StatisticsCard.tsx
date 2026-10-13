import { colorClasses } from "@/role/admin/constants";
import { StatisticsAdminDashboardType } from "@/role/admin/types/type";

export default function StatisticsCard({
  title,
  value,
  changeLabel,
  changeValue,
  icon: Icon,
}: StatisticsAdminDashboardType) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {title}
          </p>
          <p className="text-3xl text-gray-900 dark:text-gray-100 mb-1">
            {value}
          </p>
          {changeLabel && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {changeValue + " " + changeLabel}
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 bg-linear-to-br ${colorClasses[title]} rounded-xl flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
