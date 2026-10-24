import Link from "next/link";
import Panel from "@/components/ui/Panel";
import type { HistoryItem } from "../types";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));

export default function RecentHistoryTable({ items = [] }: { items?: HistoryItem[] }) {
  return (
    <Panel
      title="Recent history"
      subtitle="Your latest tests and tasks"
      action={{ href: "/student/history", label: "View all" }}
    >
      {items.length === 0 ? (
        <p className="p-6 text-center text-sm text-slate-600">
          Nothing here yet. Finish a practice task or a test and it will show up here.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[24rem] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-2 font-semibold">Test</th>
                <th scope="col" className="px-4 py-2 font-semibold">Score</th>
                <th scope="col" className="px-4 py-2 text-right font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.slice(0, 4).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2.5">
                    <Link href={item.href} className="font-medium text-slate-900 hover:text-blue-700 hover:underline">
                      {item.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-700">{item.scoreLabel}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-right text-slate-600">
                    {formatDate(item.occurredAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}