"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV, PRACTICE_NAV, DICTIONARY_NAV } from "@/lib/navigation";
import { navItemClass } from "./DesktopNav";

// Menu dọc cho điện thoại/tablet; bấm vào mục nào thì đóng menu (onNavigate)
export default function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const item = (href: string, label: string) => (
    <Link key={href} href={href} onClick={onNavigate} className={navItemClass(pathname === href)}>{label}</Link>
  );

  return (
    <div className="max-h-[70vh] space-y-1 overflow-y-auto border-t border-slate-100 bg-white px-3 py-3 lg:hidden">
      {MAIN_NAV.map((n) => item(n.href, n.label))}
      <p className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Practice</p>
      {PRACTICE_NAV.map((n) => item(n.href, n.label))}
      {item(DICTIONARY_NAV.href, DICTIONARY_NAV.label)}
    </div>
  );
}