import { createClient } from "@/lib/supabase/client";

export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

// Hàm fetch dùng chung: tự lấy JWT hiện tại của Supabase gắn vào header
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { data: { session } } = await createClient().auth.getSession();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
      ...init.headers,
    },
  });

  if (!res.ok) {
    // 401 = token hết hạn/không hợp lệ, 403 = sai quyền
    throw new ApiError(res.status, `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}