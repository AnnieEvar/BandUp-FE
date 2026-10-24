import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Gộp class và tự loại bỏ class Tailwind xung đột (vd: px-2 và px-4)
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));


// Local calendar day as YYYY-MM-DD (not UTC), so "today" matches the student's own clock
export const toDateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;