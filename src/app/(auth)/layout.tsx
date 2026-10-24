import Card from "@/components/ui/Card";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <Card className="animate-fade-in w-full max-w-md p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-2 text-xl font-bold text-blue-700">
          <div className="rounded-md bg-blue-600 px-1.5 py-1 text-xs font-extrabold tracking-wide text-white">BU</div>
          BandUp
        </div>
        {children}
      </Card>
    </div>
  );
}