import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode; // icon nhỏ bên trái ô nhập (Mail, Lock...)
}

export default function Input({ label, error, icon, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      )}
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{icon}</span>}
        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-lg border border-slate-400 bg-white px-3 text-sm text-slate-900 outline-none transition",
            "placeholder:text-slate-500 hover:border-slate-500",
            "focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20",
            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
            icon && "pl-9",
            error && "border-red-500 focus:border-red-600 focus:ring-red-600/20",
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}