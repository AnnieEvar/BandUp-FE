"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

// TODO: sau này thay bằng dữ liệu thật từ API /notifications
const ITEMS = [
  "Your Writing Task 2 was graded: Band 8.5",
  "Daily goal: 15 minutes left today",
  "New flashcard deck: Environment & Climate",
];

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)} className="relative p-2 text-slate-500 hover:text-blue-600" aria-label="Notifications">
        <Bell className="h-6 w-6" />
        <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full border border-white bg-red-500" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
          <p className="px-3 py-2 text-sm font-bold">Notifications</p>
          {ITEMS.map((t) => (
            <div key={t} className="flex gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />{t}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}