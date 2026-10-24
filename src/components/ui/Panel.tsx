import Link from "next/link";
import { cn } from "@/lib/utils";
import Card from "./Card";

interface PanelProps {
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
  className?: string;
  children: React.ReactNode;
}

// Card with a titled header row and an optional link (the prototype's panel() helper)
export default function Panel({ title, subtitle, action, className, children }: PanelProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <div>
          <h2 className="text-[0.9375rem] font-semibold text-slate-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-slate-600">{subtitle}</p>}
        </div>
        {action && (
          <Link
            href={action.href}
            className="whitespace-nowrap text-xs font-semibold text-blue-700 hover:underline"
          >
            {action.label}
          </Link>
        )}
      </div>
      {children}
    </Card>
  );
}