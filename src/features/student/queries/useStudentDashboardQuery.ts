"use client";

import { useQuery } from "@tanstack/react-query";
import { getStudentDashboard } from "../api/student.api";

export function useStudentDashboardQuery() {
  return useQuery({
    queryKey: ["student", "dashboard"], // khóa cache: sau này invalidate bằng khóa này
    queryFn: getStudentDashboard,
    staleTime: 60_000,
  });
}