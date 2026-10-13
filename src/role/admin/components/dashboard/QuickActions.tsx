import Link from "next/link";
import { actionColorClass } from "../../constants";
import { QuickAction } from "../../types/type";
import WrapperComponent from "@/shared/components/WrapperComponent";

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <WrapperComponent title="Quick Actions">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className="flex flex-col items-center p-4 border-2 border-gray-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
            >
              <div
                className={`w-12 h-12 bg-linear-to-br ${actionColorClass[action.label]} rounded-lg flex items-center justify-center mb-3`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-900 dark:text-slate-100 group-hover:text-blue-600">
                {action.label}
              </p>
            </Link>
          );
        })}
      </div>
    </WrapperComponent>
  );
}
