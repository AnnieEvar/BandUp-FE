import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";
import Card from "@/components/ui/Card";
import type { Recommendation } from "../types";

export default function RecommendationList({
  items,
}: {
  items: Recommendation[];
}) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-slate-900">
        Recommended for you
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((r) => {
          const Icon = r.category === "Flashcards" ? Layers : BookOpen;
          return (
            <Link key={r.id} href={r.href}>
              <Card className="flex items-center gap-3 p-4 transition hover:shadow-md">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-blue-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-600">{r.category}</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {r.title}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
