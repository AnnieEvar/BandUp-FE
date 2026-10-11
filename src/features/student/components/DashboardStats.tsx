import { BarChart3, Clock, Flame, Target } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import type { StudentDashboard } from "../types";

export default function DashboardStats({
  stats,
}: {
  stats: StudentDashboard["stats"];
}) {
  const pct = Math.min(
    100,
    Math.round((stats.dailyGoalDone / stats.dailyGoalTotal) * 100),
  );
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="Current Band"
        icon={BarChart3}
        tone="blue"
        value={stats.currentBand.toFixed(1)}
        hint={
          <span className="font-semibold text-emerald-700">
            ↑ {stats.bandDelta} since last test
          </span>
        }
      />
      <StatCard
        label="Target Band"
        icon={Target}
        tone="purple"
        value={stats.targetBand.toFixed(1)}
        hint={`Exam in ${stats.daysToExam} days`}
      />
      <StatCard
        label="Study Streak"
        icon={Flame}
        tone="orange"
        value={stats.studyStreak}
        unit="days"
      />
      <StatCard
        label="Daily Goal"
        icon={Clock}
        tone="green"
        value={stats.dailyGoalDone}
        unit={`/ ${stats.dailyGoalTotal} min`}
        hint={
          <div className="mt-1.5 h-1.5 rounded-full bg-slate-100">
            <div
              className="h-1.5 rounded-full bg-emerald-600"
              style={{ width: `${pct}%` }}
            />
          </div>
        }
      />
    </div>
  );
}
