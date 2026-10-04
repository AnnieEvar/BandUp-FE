import { cn } from "@/lib/utils";

const colors = {
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-emerald-100 text-emerald-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
  slate: "bg-slate-100 text-slate-700",
} as const;

export default function Badge({
  color = "slate", className, children,
}: { color?: keyof typeof colors; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide", colors[color], className)}>
      {children}
    </span>
  );
}