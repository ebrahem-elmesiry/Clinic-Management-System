interface PageTitleWithButtonProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageTitleWithButton({
  title,
  subtitle,
  action,
}: PageTitleWithButtonProps) {
  return (
    <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-2">
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-400 max-sm:mb-2">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="flex items-center gap-3">{action}</div>}
    </div>
  );
}
