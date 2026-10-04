import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import TopHeader from "@/components/layout/TopHeader";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    // Chỉ role "student" được vào khu vực này
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="min-h-screen bg-slate-50">
        <TopHeader />
        <main className="animate-fade-in mx-auto max-w-6xl p-4 md:p-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}