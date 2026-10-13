"use client";

import { Home } from "lucide-react";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { useStudentDashboardQuery } from "@/features/student/queries/useStudentDashboardQuery";
import DashboardStats from "@/features/student/components/DashboardStats";
import TodayTaskList from "@/features/student/components/TodayTaskList";
import RecommendationList from "@/features/student/components/RecommendationList";
import StudyPlanCard from "@/features/student/components/StudyPlanCard";
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
      <div className="space-y-6">
        <DashboardStats stats={data.stats} />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <TodayTaskList tasks={data.todayTasks} />
            <RecommendationList items={data.recommendations} />
          </div>
          <StudyPlanCard highlightDay={data.planHighlightDay} />
        </div>
      </div>
    </div>
  );
}
