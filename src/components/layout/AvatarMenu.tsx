"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AVATAR_NAV } from "@/lib/navigation";

export default function AvatarMenu() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  // Tên hiển thị: ưu tiên họ tên đăng ký, không có thì lấy phần đầu email
  const meta = user?.user_metadata ?? {};
  const fullName = [meta.first_name, meta.last_name].filter(Boolean).join(" ") || user?.email?.split("@")[0] || "User";
  const initials = fullName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

  async function handleSignOut() {
    await signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-1 rounded-full p-1 hover:bg-slate-50">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">{initials}</span>
        <ChevronDown className="h-4 w-4 opacity-60" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
          <div className="mb-1 border-b border-slate-100 px-3 py-2">
            <p className="text-sm font-semibold">{fullName}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
          {AVATAR_NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
          <button onClick={handleSignOut}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}