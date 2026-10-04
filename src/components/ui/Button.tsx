import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  dark: "bg-slate-900 text-white hover:bg-slate-800",
  soft: "bg-slate-100 text-slate-800 hover:bg-slate-200",
  outline: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
  danger: "bg-red-50 border border-red-200 text-red-700 hover:bg-red-100",
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
      className={cn(
        "rounded-lg px-5 py-2.5 text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}