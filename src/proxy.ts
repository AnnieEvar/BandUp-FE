import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { AUTH_PAGES, ROLE_HOME, type Role } from "@/lib/auth/roles";
const PUBLIC_PREFIXES = [
  "/student/practice", "/student/flashcards", "/student/mocks",
  "/student/dictionary", "/student/samples",
];

export async function proxy(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return NextResponse.next();
  let response = NextResponse.next({ request });

  // Tạo client có khả năng làm mới cookie session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );

  // getUser() gọi Supabase xác minh token → an toàn hơn getSession()
  const { data: { user } } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const area = path.split("/")[1]; // "student" | "teacher" | "admin" | ...
  const isPrivate = ["student", "teacher", "admin"].includes(area);
  const isPublic = PUBLIC_PREFIXES.some((p) => path.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => path.startsWith(p));
  const role = ((user?.app_metadata?.role as Role) ?? "student") as Role;

  const redirect = (to: string) => NextResponse.redirect(new URL(to, request.url));

  if (!user && isPrivate && !isPublic) return redirect("/login");          // chưa đăng nhập
  if (user && isAuthPage) return redirect(ROLE_HOME[role]);   // đã đăng nhập mà vào /login
  if (user && isPrivate && !isPublic && area !== role) return redirect(ROLE_HOME[role]); // sai khu vực

  return response;
}

// Bỏ qua file tĩnh
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};