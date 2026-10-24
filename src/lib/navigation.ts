import { Headphones, BookOpen, PenLine, Mic, CalendarDays, BarChart3, Clock, User, Settings, NotebookPen } from "lucide-react";

export const MAIN_NAV = [
  { href: "/student", label: "Home" },
  { href: "/student/flashcards", label: "Flashcards" },
  { href: "/student/mocks", label: "Mock Tests" },
];

export const PRACTICE_NAV = [
  { href: "/student/practice/listening", label: "Listening", icon: Headphones },
  { href: "/student/practice/reading", label: "Reading", icon: BookOpen },
  { href: "/student/practice/writing", label: "Writing", icon: PenLine },
  { href: "/student/practice/speaking", label: "Speaking", icon: Mic },
];

export const DICTIONARY_NAV = { href: "/student/dictionary", label: "Dictionary" };

export const AVATAR_NAV = [
  { href: "/student/notes", label: "Notes", icon: NotebookPen },
  { href: "/student/plan", label: "Study Plan", icon: CalendarDays },
  { href: "/student/progress", label: "Learning Progress", icon: BarChart3 },
  { href: "/student/history", label: "History", icon: Clock },
  { href: "/student/account", label: "My Account", icon: User },
  { href: "/student/settings", label: "Settings", icon: Settings },
];