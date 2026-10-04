"use client";

import Button from "@/components/ui/Button";
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
      <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600">
        <p className="mb-3">Không tải được dữ liệu dashboard.</p>
        <Button variant="danger" onClick={() => refetch()}>Thử lại</Button>
      </div>
    );
  }

  // Ngày hôm nay (render sau khi có data nên không bị lệch hydration)
  const today = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric" }).format(new Date());

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm text-slate-500">{today}</p>
        <h1 className="mt-1 font-display text-3xl md:text-4xl">Welcome back, {data.profile.fullName}!</h1>
        <p className="text-slate-500">Ready to hit your target IELTS today?</p>
      </section>

      <DashboardStats stats={data.stats} />

      {/* Cột trái rộng gấp đôi cột phải; mobile xếp dọc */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <TodayTaskList tasks={data.todayTasks} />
          <RecommendationList items={data.recommendations} />
        </div>
        <StudyPlanCard highlightDay={data.planHighlightDay} />
      </div>
    </div>
  );
}