import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Gộp class và tự loại bỏ class Tailwind xung đột (vd: px-2 và px-4)
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));