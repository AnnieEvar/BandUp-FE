"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  NoteNotFoundError,
  NotesUnavailableError,
  createStudentNote,
  deleteStudentNote,
  getOriginalPaper,
  getStudentNotes,
} from "../api/notes.api";
import type { NoteDraft } from "../types";

// Keys carry the user id (same convention as useStudentDashboardQuery) so accounts never share cache
const notesKey = (userId: string | undefined) => ["student", "notes", userId] as const;

// Do not retry errors that retrying cannot fix
const retryUnlessFinal = (count: number, error: Error) =>
  !(error instanceof NotesUnavailableError) && !(error instanceof NoteNotFoundError) && count < 1;

export function useStudentNotesQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: notesKey(user?.id),
    queryFn: getStudentNotes,
    enabled: !!user,
    retry: retryUnlessFinal,
  });
}

export function useOriginalPaperQuery(noteId: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: [...notesKey(user?.id), "original", noteId],
    queryFn: () => getOriginalPaper(noteId),
    enabled: !!user,
    retry: retryUnlessFinal,
  });
}

export function useCreateNoteMutation() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (draft: NoteDraft) => createStudentNote(draft),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notesKey(user?.id) }),
  });
}

export function useDeleteNoteMutation() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStudentNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notesKey(user?.id) }),
  });
}