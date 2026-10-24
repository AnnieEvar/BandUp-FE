import TopHeader from "@/components/layout/TopHeader";
import { AuthPromptProvider } from "@/features/auth/components/AuthPromptProvider";

// Layout CHUNG: Khách và học viên đều thấy thanh điều hướng.
// Việc chặn đăng nhập chuyển xuống nhóm (private).
export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthPromptProvider>
      <div className="min-h-screen bg-slate-50">
        <TopHeader />
        <main className="animate-fade-in mx-auto max-w-6xl p-4 md:p-8">{children}</main>
      </div>
    </AuthPromptProvider>
  );
}