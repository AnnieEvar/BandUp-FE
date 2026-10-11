import Link from "next/link";
import {
  BookOpen,
  Headphones,
  Layers,
  Mic,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import Card from "@/components/ui/Card";
import type { StudyTask } from "../types";

const ICONS: Record<StudyTask["subject"], LucideIcon> = {
  Flashcards: Layers,
  Reading: BookOpen,
  Writing: PenLine,
  Listening: Headphones,
  Speaking: Mic,
};

export default function TodayTaskList({ tasks }: { tasks: StudyTask[] }) {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-slate-900">
        Today&apos;s tasks
      </h2>
      <Card className="divide-y divide-slate-100">
        {tasks.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-600">
            You have finished every task for today. Well done!
          </p>
        ) : (
          tasks.map((t) => {
            const Icon = ICONS[t.subject];
            return (
              <div
                key={t.id}
                className="flex items-center gap-3 p-3.5 transition hover:bg-slate-50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    {t.title}
                  </p>
                  <p className="text-xs text-slate-600">
                    {t.subject} · {t.minutes} min
                  </p>
                </div>
                <Link
                  href={t.href}
                  className="rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Start
                </Link>
              </div>
            );
          })
        )}
      </Card>
    </section>
  );
}
