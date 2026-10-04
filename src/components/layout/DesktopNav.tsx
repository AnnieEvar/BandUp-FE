"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import { MAIN_NAV, PRACTICE_NAV, DICTIONARY_NAV } from "@/lib/navigation";

// Class dùng chung cho mọi mục menu (tương ứng .tn / .tn.on trong HTML)
export const navItemClass = (active: boolean) =>
  cn(
    "block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition",
    active ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
  );

export default function DesktopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  // Trang Home ("/student") phải khớp tuyệt đối, tránh sáng cùng lúc với mọi trang con
  const isActive = (href: string) => (href === "/student" ? pathname === href : pathname.startsWith(href));
  const practiceActive = pathname.startsWith("/student/practice");

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {MAIN_NAV.map((item) => (
        <Link key={item.href} href={item.href} className={navItemClass(isActive(item.href))}>
          {item.label}
        </Link>
      ))}

      {/* Dropdown Practice */}
      <div ref={ref} className="relative">
        <button onClick={() => setOpen((v) => !v)} className={cn(navItemClass(practiceActive), "flex items-center gap-1")}>
          Practice <ChevronDown className="h-4 w-4 opacity-60" />
        </button>
        {open && (
          <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-1 shadow-lg">
            {PRACTICE_NAV.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-slate-50",
                  pathname.startsWith(href) ? "bg-blue-50 text-blue-600" : "text-slate-700")}>
                <Icon className="h-4 w-4" /> {label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link href={DICTIONARY_NAV.href} className={navItemClass(isActive(DICTIONARY_NAV.href))}>
        {DICTIONARY_NAV.label}
      </Link>
    </nav>
  );
}