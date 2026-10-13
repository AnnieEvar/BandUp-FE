"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import NotificationDropdown from "./NotificationDropdown";
import AvatarMenu from "./AvatarMenu";

export default function TopHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useAuth();
  const isGuest = !user && !loading;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-2 px-3 md:px-8">
        <button className="p-2 text-slate-700 lg:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link href={user ? "/student" : "/"} className="mr-2 flex items-center gap-2 text-xl font-bold text-blue-700 lg:mr-6">
          <span className="rounded bg-blue-600 p-1 text-sm text-white">BU</span>
          <span className="hidden sm:block">BandUp</span>
        </Link>

        <DesktopNav />

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {isGuest ? (
            <>
              <Link href="/login" className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200">Log in</Link>
              <Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Join us</Link>
            </>
          ) : (
            <>
              <NotificationDropdown />
              <AvatarMenu />
            </>
          )}
        </div>
      </div>
      {mobileOpen && <MobileNav onNavigate={() => setMobileOpen(false)} />}
    </header>
  );
}