import { ReactNode } from "react";

interface PageTitleProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function PageTitle({
  title,
  description,
  action,
}: PageTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-slate-100 mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-slate-300">{description}</p>
      </div>
      {action}
    </div>
  );
}
