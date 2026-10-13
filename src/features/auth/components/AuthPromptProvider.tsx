"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Button from "@/components/ui/Button";

type Guard = (action?: () => void, lockLabel?: string) => () => void;
const AuthPromptContext = createContext<Guard | null>(null);

// Đã đăng nhập → chạy action; là Khách → hiện popup
export function useAuthGuard(): Guard {
  const guard = useContext(AuthPromptContext);
  if (!guard)
    throw new Error(
      "useAuthGuard phải được dùng bên trong <AuthPromptProvider>",
    );
  return guard;
}

export function AuthPromptProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState<string | null>(null); // null = đóng

  const guard: Guard = useCallback(
    (action, lockLabel = "start this exercise") =>
      () => {
        if (user) action?.();
        else setPrompt(lockLabel);
      },
    [user],
  );

  useEffect(() => {
    if (!prompt) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPrompt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prompt]);

  return (
    <AuthPromptContext.Provider value={guard}>
      {children}
      {prompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setPrompt(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-prompt-title"
            className="animate-fade-in w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              <Lock className="h-7 w-7" />
            </div>
            <h2
              id="auth-prompt-title"
              className="text-xl font-bold text-slate-900"
            >
              Join us to {prompt}
            </h2>
            <p className="mt-3 text-slate-600">
              BandUp is a free, volunteer-run community. Create a learner
              account, or log in, to do exercises, save your results and follow
              your progress. It only takes a minute.
            </p>
            <div className="mt-6 space-y-2">
              <Link href="/register" className="block">
                <Button className="w-full py-3">Create a free account</Button>
              </Link>
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full py-3">
                  I already have an account
                </Button>
              </Link>
              <button
                className="pt-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                onClick={() => setPrompt(null)}
              >
                Keep browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthPromptContext.Provider>
  );
}
