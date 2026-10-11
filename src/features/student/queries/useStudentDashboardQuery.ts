"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getStudentDashboard } from "../api/student.api";

export function useStudentDashboardQuery() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["student", "dashboard", user?.id], // gắn userId: tài khoản khác không dùng chung cache
    queryFn: getStudentDashboard,
    enabled: !!user,
    staleTime: 60_000,
  });
}