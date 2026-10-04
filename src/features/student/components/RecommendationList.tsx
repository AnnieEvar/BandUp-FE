import Link from "next/link";
import Card from "@/components/ui/Card";
import type { Recommendation } from "../types";

export default function RecommendationList({ items }: { items: Recommendation[] }) {
  if (items.length === 0) return null; // không có gợi ý thì ẩn cả khối
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold">Recommended For You</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((r) => (
          <Link key={r.id} href={r.href}>
            <Card className="flex items-center gap-4 p-4 transition hover:shadow-md">
              <div className="h-16 w-16 shrink-0 rounded-xl bg-slate-100" />
              <div>
                <p className="text-sm text-slate-500">{r.category}</p>
                <p className="font-bold">{r.title}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}