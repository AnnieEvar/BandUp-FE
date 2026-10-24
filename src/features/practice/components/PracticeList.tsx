"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Clock,
  Headphones,
  HelpCircle,
  Mic,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import GuardedButton from "@/features/auth/components/GuardedButton";
import { EXERCISES } from "../mock";
import type { Skill } from "../types";

const META: Record<
  Skill,
  { title: string; subtitle: string; icon: LucideIcon }
> = {
  listening: {
    title: "Listening Practice",
    subtitle:
      "Browse free, volunteer-made exercises. Log in to start one and save your result.",
    icon: Headphones,
  },
  reading: {
    title: "Reading Practice",
    subtitle:
      "Browse free passages and question sets. Log in to start one and save your result.",
    icon: BookOpen,
  },
  writing: {
    title: "Writing Practice",
    subtitle:
      "Write to real exam-style prompts and receive feedback from a volunteer.",
    icon: PenLine,
  },
  speaking: {
    title: "Speaking Practice",
    subtitle:
      "Record your answer, then send it to a volunteer for personal feedback.",
    icon: Mic,
  },
};

export default function PracticeList({ skill }: { skill: Skill }) {
  const router = useRouter();
  const { title, subtitle, icon: Icon } = META[skill];
  const items = EXERCISES.filter((e) => e.skill === skill);

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} icon={Icon} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((e) => (
          <Card
            key={e.id}
            className="flex flex-col overflow-hidden transition hover:shadow-md"
          >
            <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
              <span className="absolute left-3 top-3 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold text-slate-700">
                {e.tag}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-semibold text-slate-900">{e.title}</h3>
              <p className="mb-3 mt-1 text-sm text-slate-600">
                {e.description}
              </p>
              <div className="mb-3 mt-auto flex gap-4 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1">
                  <HelpCircle className="h-4 w-4" />
                  {e.questions} questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {e.duration}
                </span>
              </div>
              <div className="flex gap-2">
                {/* Làm bài: bị khóa với Khách */}
                <GuardedButton
                  className="flex-1"
                  lockLabel={`start “${e.title}”`}
                  onAction={() =>
                    router.push(`/student/practice/${skill}/${e.id}`)
                  }
                >
                  Practice now
                </GuardedButton>
                {/* Xem mẫu: LUÔN mở cho Khách (chỉ là xem trước) */}
                <Link
                  href={`/student/samples/${e.sampleId}`}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  View sample
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
