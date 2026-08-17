import { User } from "lucide-react";
import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export default function PageHero({
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <div className="bg-linear-to-r from-blue-500 to-teal-500 dark:from-blue-800 dark:to-teal-800 rounded-xl p-7 text-white">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl text-white mb-1">{title}</h1>
          <p className="text-blue-200">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
