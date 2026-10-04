import Link from "next/link";
import Card from "@/components/ui/Card";
import type { StudyTask } from "../types";

export default function TodayTaskList({ tasks }: { tasks: StudyTask[] }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold">Today's Tasks</h2>
      <Card className="divide-y divide-slate-100">
        {tasks.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-500">🎉 Bạn đã hoàn thành mọi nhiệm vụ hôm nay!</p>
        ) : (
          tasks.map((t) => (
            <div key={t.id} className="flex items-center gap-4 p-4 transition hover:bg-slate-50">
              <div className="flex-1">
                <p className="font-medium">{t.title}</p>
                <p className="text-xs text-slate-500">{t.subject}</p>
              </div>
              <Link href={t.href} className="rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800">
                Start
              </Link>
            </div>
          ))
        )}
      </Card>
    </section>
  );
}