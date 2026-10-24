"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { cn } from "@/lib/utils";
import { NoteNotFoundError, NotesUnavailableError } from "../api/notes.api";
import { useOriginalPaperQuery } from "../queries/useStudentNotes";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));

function BackLink() {
  return (
    <Link
      href="/student/notes"
      className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Notes
    </Link>
  );
}

export default function OriginalPaperView({ noteId }: { noteId: string }) {
  const { data, isPending, isError, error, refetch } = useOriginalPaperQuery(noteId);

  if (isPending) {
    return (
      <div aria-busy="true">
        <BackLink />
        <div className="mb-4 h-20 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (isError) {
    const final = error instanceof NoteNotFoundError || error instanceof NotesUnavailableError;
    return (
      <div>
        <BackLink />
        <div role="alert" className="rounded-2xl bg-red-50 p-6 text-center text-red-700">
          <p className="mb-3">
            {error instanceof NoteNotFoundError
              ? "This note no longer exists."
              : error instanceof NotesUnavailableError
                ? "Notes aren't available for your account yet."
                : "We couldn't load the original paper."}
          </p>
          {!final && (
            <Button variant="danger" onClick={() => refetch()}>
              Try again
            </Button>
          )}
        </div>
      </div>
    );
  }

  const { note, paper } = data;
  const reference = note.reference;

  const noteBanner = (
    <Card className="mb-4 border-amber-200 bg-amber-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-900">
        Your note · {note.type}
      </p>
      <p className="mt-1 text-base font-semibold text-amber-950">{note.heading}</p>
      <p className="text-sm text-amber-950">{note.meaning}</p>
    </Card>
  );

  // The reference is missing or points at a record that no longer exists
  if (!paper) {
    return (
      <div>
        <BackLink />
        <PageHeader title="Original paper" />
        {noteBanner}
        <Card className="p-8 text-center">
          <h2 className="text-base font-semibold text-slate-900">The original paper isn&apos;t available</h2>
          <p className="mt-1 text-sm text-slate-600">
            {reference
              ? `We couldn't find the source for “${reference.title}”. It may have been removed or was never saved.`
              : "You wrote this note yourself, so it isn't linked to a paper."}
          </p>
        </Card>
      </div>
    );
  }

  const attempted = paper.attemptedAt
    ? `Attempted on ${formatDate(paper.attemptedAt)}`
    : "This attempt was never submitted";
  const submissionLabel = paper.kind === "Speaking" ? "Your answer (transcript)" : "Your submission";

  return (
    <div>
      <BackLink />
      <PageHeader title={paper.title} subtitle={`${paper.kind} · ${attempted}`} />
      {noteBanner}

      {paper.questions.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-5">
          <Card className="p-5 lg:col-span-3">
            <h2 className="mb-3 text-base font-semibold text-slate-900">{paper.heading}</h2>
            <div className="space-y-3 text-sm leading-6 text-slate-700">
              {paper.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Card>
          <Card className="p-5 lg:col-span-2">
            <h2 className="mb-3 text-base font-semibold text-slate-900">Questions</h2>
            <ol className="space-y-3">
              {paper.questions.map((q) => {
                const saved = q.number === reference?.questionNumber;
                const correct = q.yourAnswer !== undefined && q.yourAnswer === q.correctAnswer;
                return (
                  <li
                    key={q.number}
                    className={cn(
                      "rounded-xl border p-3 text-sm",
                      saved ? "border-blue-500 bg-blue-50" : "border-slate-200",
                    )}
                  >
                    <p className="font-medium text-slate-900">
                      {q.number}. {q.text}
                    </p>
                    {q.options && (
                      <ul className="mt-1 space-y-0.5 text-slate-700">
                        {q.options.map((o) => (
                          <li key={o}>{o}</li>
                        ))}
                      </ul>
                    )}
                    {q.yourAnswer !== undefined && (
                      <p className={cn("mt-2 text-xs font-medium", correct ? "text-emerald-700" : "text-red-700")}>
                        Your answer: {q.yourAnswer} ({correct ? "correct" : `correct answer: ${q.correctAnswer ?? "—"}`})
                      </p>
                    )}
                    {saved && <p className="mt-1 text-xs font-semibold text-blue-700">Saved in your notes</p>}
                  </li>
                );
              })}
            </ol>
          </Card>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="mb-3 text-base font-semibold text-slate-900">{paper.heading}</h2>
            <div className="space-y-2 text-sm leading-6 text-slate-700">
              {paper.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="mb-3 text-base font-semibold text-slate-900">{submissionLabel}</h2>
            <p className="text-sm leading-6 text-slate-700">
              {paper.submission ?? "No submission was saved for this attempt."}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}