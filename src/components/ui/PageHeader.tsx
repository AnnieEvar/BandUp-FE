import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}

// Dùng cho MỌI trang (student / volunteer / admin) để tiêu đề luôn đồng bộ
export default function PageHeader({ title, subtitle, icon: Icon }: Props) {
  return (
    <div className="mb-5 flex items-start gap-3 border-b border-slate-200 pb-4">
      {Icon && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-sm text-slate-600">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
