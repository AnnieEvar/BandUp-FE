import { notFound } from "next/navigation";
import SampleView from "@/features/practice/components/SampleView";
import { SAMPLES } from "@/features/practice/mock";

export default async function SamplePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sample = SAMPLES[id];
  if (!sample) notFound();
  return <SampleView sample={sample} />;
}