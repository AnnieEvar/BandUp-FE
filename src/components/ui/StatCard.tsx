import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Card from "./Card";

const tones = {
  blue: "bg-blue-50 text-blue-700",
  purple: "bg-purple-50 text-purple-700",
  orange: "bg-orange-50 text-orange-700",
  green: "bg-emerald-50 text-emerald-700",
} as const;

interface Props {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
  tone?: keyof typeof tones;
  unit?: React.ReactNode;
  hint?: React.ReactNode;
}

// Thẻ thống kê dùng chung cho dashboard Student / Volunteer / Admin
export default function StatCard({
  label,
  value,
  icon: Icon,
  tone = "blue",
  unit,
  hint,
}: Props) {
  return (
    <Card className="flex items-start gap-3 p-4 transition hover:shadow-md">
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          tones[tone],
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-600">{label}</p>
        <p className="text-2xl font-bold leading-tight text-slate-900">
          {value}
          {unit && (
            <span className="ml-1 text-sm font-medium text-slate-600">
              {unit}
            </span>
          )}
        </p>
        {hint && <div className="mt-0.5 text-xs text-slate-600">{hint}</div>}
      </div>
    </Card>
  );
}
