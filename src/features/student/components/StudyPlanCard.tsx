import Link from "next/link";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function StudyPlanCard({ highlightDay }: { highlightDay: number }) {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const firstWeekday = new Date(now.getFullYear(), now.getMonth(), 1).getDay(); // 0 = Chủ nhật

  // Ô trống đầu tháng + các ngày trong tháng
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold">View Plan</h2>
        <Link href="/student/plan" className="text-sm text-blue-600 hover:underline">Open</Link>
      </div>
      <Card className="p-3">
        <div className="mb-2 grid grid-cols-7 text-center text-[10px] font-bold text-slate-500">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {cells.map((d, i) => (
            <div key={i} className={cn("rounded-lg py-2", d === highlightDay ? "bg-blue-600 font-bold text-white" : d ? "hover:bg-slate-100" : "")}>
              {d}
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}