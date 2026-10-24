import { Flame } from "lucide-react";
import Panel from "@/components/ui/Panel";
import { cn, toDateKey } from "@/lib/utils";
import type { StudentWeekSummary } from "../types";

const DAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];

export default function StudyStreakCard({
  streak,
  week,
}: {
  streak: number;
  week?: StudentWeekSummary;
}) {
  const todayKey = toDateKey(new Date());

  return (
    <Panel
      title="Study streak"
      subtitle="Keep the chain going"
      action={{ href: "/student/progress", label: "Calendar" }}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <Flame className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-2xl font-bold leading-tight text-slate-900">
              {streak}{" "}
              <span className="text-sm font-medium text-slate-600">
                {streak === 1 ? "day" : "days"} in a row
              </span>
            </p>
            {week && <p className="text-xs text-slate-600">Best streak: {week.bestStreak} days</p>}
          </div>
        </div>

        {week && (
          <ul className="mt-4 grid grid-cols-7 gap-1.5 text-center" aria-label="Study activity this week">
            {week.days.map((d, i) => {
              const isToday = d.date === todayKey;
              return (
                <li key={d.date}>
                  <p className="text-[10px] font-semibold text-slate-600" aria-hidden="true">
                    {DAY_LETTERS[i]}
                  </p>
                  <span
                    className={cn(
                      "mx-auto mt-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                      d.active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600",
                      isToday && "ring-2 ring-blue-600 ring-offset-1",
                    )}
                  >
                    {Number(d.date.slice(8))}
                    <span className="sr-only">
                      {d.active ? ", studied" : ", no study recorded"}
                      {isToday ? ", today" : ""}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Panel>
  );
}