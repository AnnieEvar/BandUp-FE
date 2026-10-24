import { NotebookPen } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import NotesBoard from "@/features/student/components/NotesBoard";

export default function StudentNotesPage() {
  return (
    <div>
      <PageHeader
        icon={NotebookPen}
        title="Notes"
        subtitle="Keep the words, grammar points and mistakes you want to remember."
      />
      <NotesBoard />
    </div>
  );
}