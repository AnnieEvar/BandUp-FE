import { apiFetch } from "@/lib/api/client";
import { getMockSession } from "@/lib/mock/localAuth";
import { buildMockDashboard } from "../mock";
import type { StudentDashboard } from "../types";

export async function getStudentDashboard(): Promise<StudentDashboard> {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    await new Promise((r) => setTimeout(r, 400)); // giả lập độ trễ mạng
    return buildMockDashboard(getMockSession()?.firstName || "Hien");
  }
  return apiFetch<StudentDashboard>("/students/me/dashboard");
}