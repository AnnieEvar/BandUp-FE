"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Role } from "@/lib/auth/roles";
import {
  AUTH_EVENT,
  getMockSession,
  mockSignIn,
  mockSignOut,
  mockSignUp,
  type MockUser,
} from "@/lib/mock/localAuth";

// true → đăng nhập bằng localStorage, KHÔNG cần backend hay Supabase
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export interface AppUser {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  fullName: string;
}
export interface SignUpInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthContextValue {
  user: AppUser | null;
  role: Role | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AppUser>;
  signUp: (input: SignUpInput) => Promise<{ needsEmailConfirm: boolean }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

// Chuẩn hoá cả 2 nguồn (Supabase / mock) về cùng một kiểu AppUser
function build(p: {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
}): AppUser {
  const fullName =
    [p.firstName, p.lastName].filter(Boolean).join(" ") ||
    p.email.split("@")[0] ||
    "User";
  return { ...p, fullName };
}
const fromMock = (u: MockUser) => build(u);
const fromSupabase = (u: User) =>
  build({
    id: u.id,
    email: u.email ?? "",
    role: (u.app_metadata?.role as Role) ?? "student",
    firstName: String(u.user_metadata?.first_name ?? ""),
    lastName: String(u.user_metadata?.last_name ?? ""),
  });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  // Chỉ tạo Supabase client khi KHÔNG ở chế độ mock
  const supabase = useMemo(() => (USE_MOCK ? null : createClient()), []);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      const sync = () => {
        const session = getMockSession();
        setUser(session ? fromMock(session) : null);
        setLoading(false);
      };
      sync();
      window.addEventListener(AUTH_EVENT, sync); // đăng nhập/đăng xuất cùng tab
      window.addEventListener("storage", sync); // đồng bộ giữa các tab
      return () => {
        window.removeEventListener(AUTH_EVENT, sync);
        window.removeEventListener("storage", sync);
      };
    }
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? fromSupabase(data.user) : null);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? fromSupabase(session.user) : null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const value: AuthContextValue = {
    user,
    role: user?.role ?? null,
    loading,

    signIn: async (email, password) => {
      if (!supabase) return fromMock(await mockSignIn(email, password));
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error("Incorrect email or password.");
      return fromSupabase(data.user);
    },

    signUp: async ({ email, password, firstName, lastName }) => {
      if (!supabase) {
        await mockSignUp({ email, password, firstName, lastName });
        return { needsEmailConfirm: false };
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName, last_name: lastName } },
      });
      if (error) throw new Error(error.message);
      return { needsEmailConfirm: true };
    },

    signOut: async () => {
      if (supabase) await supabase.auth.signOut();
      else mockSignOut();
      queryClient.clear(); // xoá cache để người dùng sau không thấy dữ liệu của người trước
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
