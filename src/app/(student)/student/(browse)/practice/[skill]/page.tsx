import { notFound } from "next/navigation";
import PracticeList from "@/features/practice/components/PracticeList";
import { SKILLS, type Skill } from "@/features/practice/types";

// Next 16: params là Promise nên phải await
export default async function PracticePage({ params }: { params: Promise<{ skill: string }> }) {
  const { skill } = await params;
  if (!SKILLS.includes(skill as Skill)) notFound();
  return <PracticeList skill={skill as Skill} />;
}