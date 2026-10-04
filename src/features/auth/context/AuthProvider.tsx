"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Role } from "@/lib/auth/roles";

export interface AuthContextValue {
  user: User | null;
  role: Role | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Lấy user hiện tại khi tải trang
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    // 2. Lắng nghe đăng nhập / đăng xuất / làm mới token
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe(); // dọn dẹp tránh rò rỉ bộ nhớ
  }, [supabase]);

  // Role đọc từ app_metadata (đã được server gán, không bị sửa từ client)
  const role: Role | null = user ? ((user.app_metadata?.role as Role) ?? "student") : null;

  const value: AuthContextValue = {
    user, role, loading,
    signOut: async () => { await supabase.auth.signOut(); },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}