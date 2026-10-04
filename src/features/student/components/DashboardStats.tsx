import Card from "@/components/ui/Card";
import type { StudentDashboard } from "../types";

// Một thẻ thống kê (tương ứng hàm stat()/ô thông số trong PG.home)
function StatCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <p className="mb-2 text-slate-600">{label}</p>
      {children}
    </Card>
  );
}

export default function DashboardStats({ stats }: { stats: StudentDashboard["stats"] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label="Current Band">
        <span className="text-4xl font-bold">{stats.currentBand.toFixed(1)}</span>{" "}
        <span className="text-slate-500">↑ {stats.bandDelta}</span>
      </StatCard>

      <StatCard label="Target Band">
        <span className="text-4xl font-bold">{stats.targetBand.toFixed(1)}</span>
        <p className="text-sm text-slate-500">Exam in {stats.daysToExam} days</p>
      </StatCard>

      <StatCard label="Study Streak">
        <span className="text-4xl font-bold">{stats.studyStreak}</span>{" "}
        <span className="text-3xl font-bold text-slate-400">Days</span>
      </StatCard>

      <StatCard label="Daily Goal">
        <span className="text-4xl font-bold">{stats.dailyGoalDone}</span>{" "}
        <span className="text-3xl font-bold text-slate-400">/ {stats.dailyGoalTotal}m</span>
      </StatCard>
    </div>
  );
}