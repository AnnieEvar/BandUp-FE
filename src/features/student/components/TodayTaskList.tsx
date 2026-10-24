import Link from "next/link";
import {
  BookOpen,
  Check,
  Headphones,
  Layers,
  Mic,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import Panel from "@/components/ui/Panel";
import { cn } from "@/lib/utils";
import type { StudyTask } from "../types";

const ICONS: Record<StudyTask["subject"], LucideIcon> = {
  Flashcards: Layers,
  Reading: BookOpen,
  Writing: PenLine,
  Listening: Headphones,
  Speaking: Mic,
};

export default function TodayTaskList({ tasks }: { tasks: StudyTask[] }) {
  const doneCount = tasks.filter((t) => t.done).length;
  const subtitle = tasks.length === 0 ? "Nothing planned yet" : `${doneCount} of ${tasks.length} done`;

  return (
    <Panel
      title="Today's tasks"
      subtitle={subtitle}
      action={{ href: "/student/plan", label: "Study plan" }}
    >
      {tasks.length === 0 ? (
        <div className="p-8 text-center">
          <p className="mb-3 text-sm text-slate-600">Plan something small for today.</p>
          <Link
            href="/student/plan"
            className="inline-flex h-9 items-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Add a task
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {tasks.map((t) => {
            const Icon = ICONS[t.subject];
            const done = t.done === true;
            return (
              <li
                key={t.id}
                className="flex items-center gap-3 p-3.5 transition hover:bg-slate-50"
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    done ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700",
                  )}
                >
                  {done ? (
                    <Check className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      done ? "text-slate-500 line-through" : "text-slate-900",
                    )}
                  >
                    {t.title}
                  </p>
                  <p className="text-xs text-slate-600">
                    {t.subject} · {t.minutes} min
                  </p>
                </div>
                {done ? (
                  <span className="text-xs font-semibold text-emerald-700">Done</span>
                ) : (
                  <Link
                    href={t.href}
                    className="rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Start
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}