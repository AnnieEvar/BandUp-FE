import Card from "@/components/ui/Card";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <Card className="animate-fade-in w-full max-w-sm p-6 sm:p-7">
        <div className="mb-6 flex items-center gap-2 text-xl font-bold text-blue-600">
          <div className="rounded bg-blue-600 p-1 text-sm text-white">EP</div>
          BandUp
        </div>
        {children}
      </Card>
    </div>
  );
}