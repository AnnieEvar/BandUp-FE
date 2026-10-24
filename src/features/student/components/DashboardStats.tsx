import { BarChart3, CalendarDays, type LucideIcon } from "lucide-react";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { StudentDashboard } from "../types";

interface Metric {
  label: string;
  value: React.ReactNode;
  unit?: string;
  hint?: string;
}

// Two-metric card from the v8 dashboard (the prototype's dual() helper)
function DualStatCard({
  title,
  icon: Icon,
  tone,
  metrics,
}: {
  title: string;
  icon: LucideIcon;
  tone: string;
  metrics: [Metric, Metric];
}) {
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", tone)}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h2 className="text-[0.9375rem] font-semibold text-slate-900">{title}</h2>
      </div>
      <dl className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <div key={m.label} className={cn(i > 0 && "border-l border-slate-100 pl-3")}>
            <dt className="text-xs text-slate-600">{m.label}</dt>
            <dd className="text-2xl font-bold leading-tight text-slate-900">
              {m.value}
              {m.unit && <span className="ml-1 text-sm font-medium text-slate-600">{m.unit}</span>}
            </dd>
            {m.hint && <dd className="mt-0.5 text-xs text-slate-600">{m.hint}</dd>}
          </div>
        ))}
      </dl>
    </Card>
  );
}

export default function DashboardStats({
  stats,
  week,
}: {
  stats: StudentDashboard["stats"];
  week?: StudentDashboard["week"];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <DualStatCard
        title="Band"
        icon={BarChart3}
        tone="bg-blue-50 text-blue-700"
        metrics={[
          {
            label: "Current band",
            value: stats.currentBand.toFixed(1),
            hint: stats.bandDelta > 0 ? `↑ ${stats.bandDelta} since last test` : undefined,
          },
          {
            label: "Target band",
            value: stats.targetBand.toFixed(1),
            hint: `Exam in ${stats.daysToExam} days`,
          },
        ]}
      />
      <DualStatCard
        title="This week"
        icon={CalendarDays}
        tone="bg-purple-50 text-purple-700"
        metrics={[
          { label: "Tasks done", value: week ? week.tasksDone : "—" },
          { label: "Study time", value: week ? week.studyMinutes : "—", unit: week ? "min" : undefined },
        ]}
      />
    </div>
  );
}