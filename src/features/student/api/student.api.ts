import { apiFetch } from "@/lib/api/client";
import { mockDashboard } from "../mock";
import type { StudentDashboard } from "../types";

export async function getStudentDashboard(): Promise<StudentDashboard> {
  // Công tắc dev: NEXT_PUBLIC_USE_MOCK=true → dùng dữ liệu giả (giả lập độ trễ mạng)
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    await new Promise((r) => setTimeout(r, 600));
    return mockDashboard;
  }
  return apiFetch<StudentDashboard>("/students/me/dashboard");
}