"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Headphones,
  Mic,
  NotebookPen,
  PenLine,
  Trash2,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { NoteReference, NoteType, StudentNote, TaskKind } from "../types";

const TYPE_STYLE: Record<NoteType, { icon: LucideIcon; badge: "blue" | "purple" | "orange"; tile: string }> = {
  Vocabulary: { icon: BookOpen, badge: "blue", tile: "bg-blue-50 text-blue-700" },
  Grammar: { icon: PenLine, badge: "purple", tile: "bg-purple-50 text-purple-700" },
  Mistake: { icon: TriangleAlert, badge: "orange", tile: "bg-orange-50 text-orange-700" },
};

const KIND_ICON: Record<TaskKind, LucideIcon> = {
  Reading: BookOpen,
  Listening: Headphones,
  Writing: PenLine,
  Speaking: Mic,
  "Mock Test": FileText,
};

// A reference is usable only if it can identify a paper. Whether the paper still exists is
// checked on the destination page, which shows an "unavailable" state if it cannot be found.
const hasValidReference = (ref?: NoteReference): ref is NoteReference =>
  !!ref && ref.token.trim() !== "" && ref.title.trim() !== "";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));

export default function NoteCard({
  note,
  onDelete,
}: {
  note: StudentNote;
  onDelete: (id: string) => Promise<void>;
}) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const style = TYPE_STYLE[note.type];
  const TypeIcon = style.icon;
  const reference = hasValidReference(note.reference) ? note.reference : null;
  const OriginIcon = reference ? KIND_ICON[reference.kind] : NotebookPen;

  async function confirmDelete() {
    setBusy(true);
    try {
      await onDelete(note.id);
    } finally {
      setBusy(false);
      setConfirming(false);
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", style.tile)}>
          <TypeIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">{note.heading}</h3>
            <Badge color={style.badge}>{note.type}</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-700">{note.meaning}</p>
          {note.example && (
            <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-sm italic text-slate-700">
              {note.example}
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 font-medium">
              <OriginIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {note.source}
            </span>
            <span>{formatDate(note.createdAt)}</span>
            {reference && (
              <Link
                href={`/student/notes/${encodeURIComponent(note.id)}/original`}
                className="font-semibold text-blue-700 hover:underline"
              >
                View Original Paper
              </Link>
            )}
          </div>
        </div>

        {!confirming && (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            aria-label={`Delete note: ${note.heading}`}
            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {confirming && (
        <div
          role="alertdialog"
          aria-label={`Confirm deleting ${note.heading}`}
          className="mt-3 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-3"
        >
          <p className="mr-auto text-sm text-slate-700">Delete this note?</p>
          <Button type="button" variant="outline" className="h-9" onClick={() => setConfirming(false)} disabled={busy}>
            Cancel
          </Button>
          <Button type="button" variant="danger" className="h-9" onClick={confirmDelete} loading={busy}>
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
}