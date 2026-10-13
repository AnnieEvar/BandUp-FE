import PageHeader from "./PageHeader";
import Card from "./Card";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <PageHeader title={title} subtitle="This page is on its way." />
      <Card className="p-8 text-center text-sm text-slate-600">We are still building this page. Please check back soon.</Card>
    </>
  );
}