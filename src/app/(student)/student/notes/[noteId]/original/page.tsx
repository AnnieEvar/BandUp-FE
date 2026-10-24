"use client";

import { useParams } from "next/navigation";
import OriginalPaperView from "@/features/student/components/OriginalPaperView";

export default function OriginalPaperPage() {
  const { noteId } = useParams<{ noteId: string }>();
  return <OriginalPaperView noteId={noteId} />;
}