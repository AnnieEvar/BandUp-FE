"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import GuardedButton from "@/features/auth/components/GuardedButton";
import type { Sample } from "../types";

export default function SampleView({ sample: s }: { sample: Sample }) {
  const router = useRouter();
  const skillLabel = s.skill[0].toUpperCase() + s.skill.slice(1);
  const h2 = "mb-3 font-semibold text-slate-900";

  const left = (
    <>
      {s.skill === "listening" && (
        <>
          {/* Trình phát giả lập: sau này thay bằng <audio controls src="/audio/..."> */}
          <div className="mb-5 flex items-center gap-4 rounded-xl bg-slate-900 p-4 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900">
              ▶
            </span>
            <div className="h-1.5 flex-1 rounded-full bg-white/20">
              <div className="h-1.5 w-2/5 rounded-full bg-blue-400" />
            </div>
            <span className="text-xs text-slate-200">02:10</span>
          </div>
          <h2 className={h2}>Transcript (extract)</h2>
          <div className="space-y-3 text-sm">
            {s.transcript?.map((t, i) => (
              <p key={i}>
                <span className="font-semibold text-slate-900">
                  {t.speaker}:
                </span>{" "}
                {t.text}
              </p>
            ))}
          </div>
        </>
      )}
      {s.skill === "reading" && (
        <>
          <h2 className={h2}>{s.title}</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            {s.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </>
      )}
      {s.skill === "writing" && (
        <>
          <h2 className="mb-2 font-semibold text-slate-900">Task prompt</h2>
          <blockquote className="border-l-4 border-blue-200 pl-3 text-sm italic">
            {s.prompt}
          </blockquote>
          <div className="mb-2 mt-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Model answer</h2>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium">
              {s.paragraphs?.join(" ").split(/\s+/).length} words
            </span>
          </div>
          <div className="space-y-3 text-sm leading-relaxed">
            {s.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </>
      )}
      {s.skill === "speaking" && (
        <>
          <h2 className="mb-2 font-semibold text-slate-900">
            Examiner&apos;s questions
          </h2>
          <ul className="mb-5 list-disc space-y-1 pl-5 text-sm">
            {(Array.isArray(s.prompt) ? s.prompt : [s.prompt]).map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
          <h2 className="mb-2 font-semibold text-slate-900">Sample answer</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            {s.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </>
      )}
    </>
  );

  const tips = (
    <div className="mt-5 rounded-xl bg-blue-50 p-4">
      <h3 className="mb-2 text-sm font-semibold text-blue-950">Exam tips</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-blue-950">
        {s.tips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Link
        href={`/student/practice/${s.skill}`}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {skillLabel}
      </Link>
      <div className="mb-5 border-b border-slate-200 pb-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge color="orange">Sample</Badge>
          <Badge color="blue">{skillLabel}</Badge>
          <span className="text-xs text-slate-600">
            {s.format} · {s.duration}
          </span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
          {s.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          A short preview of how this exercise works. Full exercises are timed,
          scored and saved to your history.
        </p>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-5">
        <Card className="p-5 text-slate-700 lg:col-span-3">{left}</Card>
        <aside className="space-y-4 lg:col-span-2">
          <Card className="p-5">
            {s.questions && (
              <>
                <h2 className="mb-1 font-semibold text-slate-900">
                  Sample questions
                </h2>
                <ol className="divide-y divide-slate-100">
                  {s.questions.map((q, i) => (
                    <li key={i} className="py-3">
                      <p className="text-sm text-slate-800">
                        <b>{i + 1}.</b> {q.q}
                      </p>
                      <details className="mt-1">
                        <summary className="cursor-pointer text-sm font-medium text-blue-700">
                          Show answer
                        </summary>
                        <p className="mt-1 text-sm font-semibold text-emerald-700">
                          {q.a}
                        </p>
                      </details>
                    </li>
                  ))}
                </ol>
              </>
            )}
            {s.criteria && (
              <>
                <h2 className={h2}>Why this is a strong answer</h2>
                <ul className="space-y-3">
                  {s.criteria.map((c) => (
                    <li key={c.name} className="text-sm">
                      <p className="font-semibold text-slate-900">{c.name}</p>
                      <p className="text-slate-600">{c.note}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {s.language && (
              <>
                <h2 className={h2}>Useful language</h2>
                <div className="flex flex-wrap gap-2">
                  {s.language.map((l) => (
                    <span
                      key={l}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </>
            )}
            {tips}
          </Card>
          <Card className="p-5 text-center">
            <p className="font-semibold text-slate-900">
              Ready for the full exercise?
            </p>
            <p className="mb-4 mt-1 text-sm text-slate-600">
              Timed practice, with your answers saved.
            </p>
            <GuardedButton
              className="w-full"
              lockLabel="start this exercise"
              onAction={() => router.push(`/student/practice/${s.skill}`)}
            >
              Start full exercise
            </GuardedButton>
          </Card>
        </aside>
      </div>
    </>
  );
}
