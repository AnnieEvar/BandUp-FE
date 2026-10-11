import { cn } from "@/lib/utils";

const variants = {
   primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
  dark: "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950",
  soft: "bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300",
  outline: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100",
  danger: "bg-red-50 border border-red-200 text-red-700 hover:bg-red-100",
  // Trạng thái "bị khóa" cho Khách: xám, nét đứt, chữ vẫn đủ tương phản
  locked: "bg-slate-200 border border-dashed border-slate-400 text-slate-700 hover:bg-slate-300 cursor-not-allowed",
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  loading?: boolean;
}

export default function Button({
  variant = "primary", loading, className, children, disabled, ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn("inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}