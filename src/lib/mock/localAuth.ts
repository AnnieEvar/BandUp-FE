import type { Role } from "@/lib/auth/roles";

export interface MockUser {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
}
interface StoredUser extends MockUser { passwordHash: string }

const USERS_KEY = "bandup_mock_users";
const SESSION_KEY = "bandup_mock_session";
export const AUTH_EVENT = "bandup-auth-change"; // phát ra mỗi khi đăng nhập / đăng xuất

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
const write = (key: string, value: unknown) => window.localStorage.setItem(key, JSON.stringify(value));
const notify = () => window.dispatchEvent(new Event(AUTH_EVENT));

// Băm mật khẩu để không lưu chữ thường. CHỈ để demo.
async function hash(text: string): Promise<string> {
  if (!globalThis.crypto?.subtle) return btoa(text);
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Tài khoản có sẵn cho cả 3 vai trò (mật khẩu: 12345678)
async function users(): Promise<StoredUser[]> {
  const list = read<StoredUser[]>(USERS_KEY, []);
  if (list.length) return list;
  const passwordHash = await hash("12345678");
  const seed: StoredUser[] = [
    { id: "u-student", email: "student@bandup.test", role: "student", firstName: "Hien", lastName: "Phuong", passwordHash },
    { id: "u-volunteer", email: "volunteer@bandup.test", role: "teacher", firstName: "Hoang", lastName: "Phuong", passwordHash },
    { id: "u-admin", email: "admin@bandup.test", role: "admin", firstName: "Admin", lastName: "BandUp", passwordHash },
  ];
  write(USERS_KEY, seed);
  return seed;
}

// Bỏ passwordHash trước khi lưu session
const strip = (u: StoredUser): MockUser => ({ id: u.id, email: u.email, role: u.role, firstName: u.firstName, lastName: u.lastName });

export function getMockSession(): MockUser | null {
  if (typeof window === "undefined") return null;
  return read<MockUser | null>(SESSION_KEY, null);
}

export async function mockSignUp(input: { email: string; password: string; firstName: string; lastName: string }): Promise<MockUser> {
  const list = await users();
  const email = input.email.trim().toLowerCase();
  if (list.some((u) => u.email === email)) throw new Error("This email is already registered.");
  const user: StoredUser = {
    id: crypto.randomUUID(), email, role: "student",
    firstName: input.firstName, lastName: input.lastName,
    passwordHash: await hash(input.password),
  };
  write(USERS_KEY, [...list, user]);
  write(SESSION_KEY, strip(user)); // đăng ký xong tự đăng nhập
  notify();
  return strip(user);
}

export async function mockSignIn(emailInput: string, password: string): Promise<MockUser> {
  const email = emailInput.trim().toLowerCase();
  const found = (await users()).find((u) => u.email === email);
  if (!found || found.passwordHash !== (await hash(password))) throw new Error("Incorrect email or password.");
  write(SESSION_KEY, strip(found));
  notify();
  return strip(found);
}

export function mockSignOut() {
  window.localStorage.removeItem(SESSION_KEY);
  notify();
}

// ---- Password reset (mock mode only; nothing is emailed) ----
const RECOVERY_KEY = "bandup_mock_recovery";
const RECOVERY_TTL_MS = 15 * 60 * 1000;
// Typing this address on /forgot-password previews the failure state
export const MOCK_RESET_FAIL_EMAIL = "error@bandup.test";

export async function mockRequestPasswordReset(emailInput: string): Promise<void> {
  const email = emailInput.trim().toLowerCase();
  await new Promise((resolve) => setTimeout(resolve, 600)); // simulated latency
  if (email === MOCK_RESET_FAIL_EMAIL) {
    throw new Error("We couldn't send the reset link. Please try again in a moment.");
  }
  // Same result whether or not the account exists, so the UI cannot be used to probe accounts
  write(RECOVERY_KEY, { email, expiresAt: Date.now() + RECOVERY_TTL_MS });
}

export async function mockUpdatePassword(password: string): Promise<void> {
  const pending = read<{ email: string; expiresAt: number } | null>(RECOVERY_KEY, null);
  if (!pending || pending.expiresAt < Date.now()) {
    throw new Error("This reset link is invalid or has expired. Please request a new one.");
  }
  const passwordHash = await hash(password);
  const list = await users();
  write(USERS_KEY, list.map((u) => (u.email === pending.email ? { ...u, passwordHash } : u)));
  window.localStorage.removeItem(RECOVERY_KEY);
}