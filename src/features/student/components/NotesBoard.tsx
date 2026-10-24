"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { NotesUnavailableError } from "../api/notes.api";
import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useStudentNotesQuery,
} from "../queries/useStudentNotes";
import type { NoteType } from "../types";
import NoteCard from "./NoteCard";

const NOTE_TYPES: NoteType[] = ["Vocabulary", "Grammar", "Mistake"];

// Same look as <Input>, for the <select> and <textarea> it does not cover
const controlClass = cn(
  "w-full rounded-lg border border-slate-400 bg-white px-3 text-sm text-slate-900 outline-none transition",
  "placeholder:text-slate-500 hover:border-slate-500",
  "focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20",
);
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export default function NotesBoard() {
  const {
    data: notes,
    isPending,
    isError,
    error,
    refetch,
  } = useStudentNotesQuery();
  const createNote = useCreateNoteMutation();
  const deleteNote = useDeleteNoteMutation();
  const [typeFilter, setTypeFilter] = useState<"all" | NoteType>("all");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");
  const [listError, setListError] = useState("");

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (notes ?? []).filter(
      (n) =>
        (typeFilter === "all" || n.type === typeFilter) &&
        (!q ||
          [n.heading, n.meaning, n.example ?? "", n.source].some((s) =>
            s.toLowerCase().includes(q),
          )),
    );
  }, [notes, typeFilter, search]);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setNotice("");
    const form = e.currentTarget; // read before awaiting: currentTarget is cleared afterwards
    const f = new FormData(form);
    const heading = String(f.get("heading")).trim();
    const meaning = String(f.get("meaning")).trim();
    if (!heading || !meaning)
      return setFormError("Please fill in the word and its explanation.");
    try {
      await createNote.mutateAsync({
        type: String(f.get("type")) as NoteType,
        heading,
        meaning,
        example: String(f.get("example")).trim() || undefined,
        source: String(f.get("source")).trim() || undefined,
      });
      form.reset();
      setNotice("Note saved.");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "We couldn't save your note.",
      );
    }
  }

  async function handleDelete(id: string) {
    setListError("");
    setNotice("");
    try {
      await deleteNote.mutateAsync(id);
      setNotice("Note deleted.");
    } catch (err) {
      setListError(
        err instanceof Error ? err.message : "We couldn't delete that note.",
      );
    }
  }

  if (isPending) {
    return (
      <div className="grid gap-6 lg:grid-cols-3" aria-busy="true">
        <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />
        <div className="space-y-3 lg:col-span-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    if (error instanceof NotesUnavailableError) {
      return (
        <Card className="p-8 text-center">
          <h2 className="text-base font-semibold text-slate-900">
            Notes are coming soon
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Saving and reviewing notes isn&apos;t available for your account
            yet.
          </p>
        </Card>
      );
    }
    return (
      <div
        role="alert"
        className="rounded-2xl bg-red-50 p-6 text-center text-red-700"
      >
        <p className="mb-3">We couldn&apos;t load your notes.</p>
        <Button variant="danger" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="self-start p-5">
        <form onSubmit={handleCreate} className="space-y-4">
          <h2 className="text-base font-semibold text-slate-900">Add a note</h2>
          <div>
            <label htmlFor="note-type" className={labelClass}>
              Type
            </label>
            <select
              id="note-type"
              name="type"
              className={cn(controlClass, "h-11")}
              defaultValue="Vocabulary"
            >
              {NOTE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <Input
            name="heading"
            label="Word, rule or mistake"
            placeholder="e.g. mitigate"
            maxLength={120}
            required
          />
          <div>
            <label htmlFor="note-meaning" className={labelClass}>
              Meaning or explanation
            </label>
            <textarea
              id="note-meaning"
              name="meaning"
              rows={3}
              maxLength={500}
              required
              className={cn(controlClass, "py-2.5")}
            />
          </div>
          <Input
            name="example"
            label="Example or correction (optional)"
            maxLength={300}
          />
          <Input
            name="source"
            label="Where from? (optional)"
            placeholder="My own note"
            maxLength={120}
          />
          {formError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              {formError}
            </p>
          )}
          <Button
            type="submit"
            loading={createNote.isPending}
            className="w-full"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> Save note
          </Button>
        </form>
      </Card>

      <section aria-label="Your notes" className="lg:col-span-2">
        <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <select
            aria-label="Filter by type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "all" | NoteType)}
            className={cn(controlClass, "h-11 sm:w-44")}
          >
            <option value="all">All types</option>
            {NOTE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="sm:flex-1">
            <Input
              type="search"
              aria-label="Search your notes"
              placeholder="Search words, rules or sources"
              icon={<Search className="h-4 w-4" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Card>

        <p
          role="status"
          className={cn("mb-3 text-sm text-emerald-700", !notice && "sr-only")}
        >
          {notice}
        </p>
        {listError && (
          <p
            role="alert"
            className="mb-3 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700"
          >
            {listError}
          </p>
        )}

        {visible.length === 0 ? (
          <Card className="p-8 text-center text-sm text-slate-600">
            {(notes ?? []).length === 0
              ? "No notes yet. Add your first word, rule or mistake."
              : "No notes match your search."}
          </Card>
        ) : (
          <div className="space-y-3">
            {visible.map((n) => (
              <NoteCard key={n.id} note={n} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
