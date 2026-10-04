"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROLE_HOME, type Role } from "./roles";

interface Props {
  children: React.ReactNode;
  allowedRoles?: Role[]; // bỏ trống = chỉ cần đăng nhập
}

export default function ProtectedRoute({ children, allowedRoles = [] }: Props) {
  const router = useRouter();
  const { user, role, loading } = useAuth();

  // Có cần kiểm tra role không, và role hiện tại có hợp lệ không
  const roleDenied = allowedRoles.length > 0 && (!role || !allowedRoles.includes(role));

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");               // chưa đăng nhập
    else if (roleDenied && role) router.replace(ROLE_HOME[role]); // sai role → về khu vực của mình
  }, [user, role, loading, roleDenied, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Checking authentication...</p>
      </div>
    );
  }

  if (!user || roleDenied) return null; // đang chờ chuyển hướng

  return <>{children}</>;
}