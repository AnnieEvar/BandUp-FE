"use client";

import Link from "next/link";
import { Home, NotebookPen } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { useStudentDashboardQuery } from "@/features/student/queries/useStudentDashboardQuery";
import DashboardStats from "@/features/student/components/DashboardStats";
import TodayTaskList from "@/features/student/components/TodayTaskList";
import StudyStreakCard from "@/features/student/components/StudyStreakCard";
import RecentHistoryTable from "@/features/student/components/RecentHistoryTable";
import DashboardSkeleton from "@/features/student/components/DashboardSkeleton";

export default function StudentDashboardPage() {
  const { data, isPending, isError, refetch } = useStudentDashboardQuery();

  if (isPending) return <DashboardSkeleton />;
  if (isError) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-center text-red-700">
        <p className="mb-3">We couldn&apos;t load your dashboard.</p>
        <Button variant="danger" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <div>
      <PageHeader
        icon={Home}
        title={`Welcome back, ${data.profile.fullName}!`}
        subtitle={`${today} · Ready to get closer to your target band today?`}
      />
      <div className="space-y-4">
        <DashboardStats stats={data.stats} week={data.week} />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TodayTaskList tasks={data.todayTasks} />
          </div>
          <StudyStreakCard streak={data.stats.studyStreak} week={data.week} />
        </div>
        <RecentHistoryTable items={data.recentHistory} />
        <Link href="/student/notes" className="block">
          <Card className="flex items-center gap-3 p-4 transition hover:shadow-md">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <NotebookPen className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">Notes</p>
              <p className="text-xs text-slate-600">
                Review the words, grammar points and mistakes you saved, and jump back to the original paper.
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}