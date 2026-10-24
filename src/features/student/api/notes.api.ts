import { getMockSession } from "@/lib/mock/localAuth";
import { buildMockNotes, findMockOriginalPaper } from "../mock";
import type { NoteDraft, NoteType, OriginalPaper, StudentNote } from "../types";

// Same switch as student.api.ts
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";
const NOTE_TYPES: readonly NoteType[] = ["Vocabulary", "Grammar", "Mistake"];

// The repository defines no backend contract for notes or original-paper lookup.
// Outside mock mode every function below throws this instead of calling an invented endpoint.
// BACKEND INTEGRATION POINTS: replace the `throw new NotesUnavailableError()` lines with
// apiFetch<...>(...) calls once the API exists, keeping these function signatures.
export class NotesUnavailableError extends Error {
  constructor() {
    super("Notes are not available yet.");
    this.name = "NotesUnavailableError";
  }
}

export class NoteNotFoundError extends Error {
  constructor() {
    super("This note no longer exists.");
    this.name = "NoteNotFoundError";
  }
}

export interface OriginalPaperResult {
  note: StudentNote;
  paper: OriginalPaper | null; // null = the note's source record cannot be found
}

const delay = (ms = 300) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// ---- Mock persistence: one localStorage entry PER signed-in user, so accounts never see each other's notes ----
function storageKey(): string {
  const id = getMockSession()?.id;
  if (!id) throw new Error("You need to be signed in to use notes.");
  return `bandup_mock_notes:${id}`;
}

function readNotes(): StudentNote[] {
  const key = storageKey();
  try {
    const raw = window.localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as StudentNote[];
  } catch {
    // corrupted or unavailable storage: fall through to the seed data
  }
  const seed = buildMockNotes();
  writeNotes(seed);
  return seed;
}

function writeNotes(list: StudentNote[]) {
  try {
    window.localStorage.setItem(storageKey(), JSON.stringify(list));
  } catch {
    // storage full or blocked: the in-memory result still reaches the UI for this session
  }
}

const newestFirst = (list: StudentNote[]) =>
  [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export async function getStudentNotes(): Promise<StudentNote[]> {
  if (!USE_MOCK) throw new NotesUnavailableError();
  await delay();
  return newestFirst(readNotes());
}

export async function createStudentNote(
  draft: NoteDraft,
): Promise<StudentNote> {
  if (!USE_MOCK) throw new NotesUnavailableError();
  await delay(200);
  const heading = draft.heading.trim();
  const meaning = draft.meaning.trim();
  if (!NOTE_TYPES.includes(draft.type))
    throw new Error("Please choose a note type.");
  if (!heading || !meaning)
    throw new Error("Please fill in the word and its explanation.");
  const note: StudentNote = {
    id: crypto.randomUUID(),
    type: draft.type,
    heading,
    meaning,
    example: draft.example?.trim() || undefined,
    source: draft.source?.trim() || "My own note",
    createdAt: new Date().toISOString(),
    // hand-written notes have no reference, so they never offer "View Original Paper"
  };
  writeNotes([note, ...readNotes()]);
  return note;
}

export async function deleteStudentNote(id: string): Promise<void> {
  if (!USE_MOCK) throw new NotesUnavailableError();
  await delay(200);
  writeNotes(readNotes().filter((n) => n.id !== id));
}

export async function getOriginalPaper(
  noteId: string,
): Promise<OriginalPaperResult> {
  if (!USE_MOCK) throw new NotesUnavailableError();
  await delay();
  const note = readNotes().find((n) => n.id === noteId);
  if (!note) throw new NoteNotFoundError();
  const paper = note.reference
    ? (findMockOriginalPaper(note.reference.token) ?? null)
    : null;
  return { note, paper };
}
