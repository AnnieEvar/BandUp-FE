export type Role = "student" | "teacher" | "admin";

// Trang chủ của từng role, dùng để chuyển hướng sau login hoặc khi sai quyền
export const ROLE_HOME: Record<Role, string> = {
  student: "/student",
  teacher: "/teacher",
  admin: "/admin",
};

export const AUTH_PAGES = ["/login", "/register", "/teacher-application"];