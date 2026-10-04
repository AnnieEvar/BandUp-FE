"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ROLE_HOME, type Role } from "@/lib/auth/roles";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  authFormClassName,
  authLinkClassName,
  authPrimaryButtonClassName,
} from "./auth-form.styles";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const supabase = createClient();

    // Đăng nhập bằng email + mật khẩu
    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });

    if (error) {
      setError("Incorrect email or password.");
      setLoading(false);
      return;
    }

    // Chuyển đến trang chủ đúng role, refresh để middleware nhận cookie mới
    const role = ((data.user.app_metadata?.role as Role) ?? "student") as Role;
    router.replace(ROLE_HOME[role]);
    router.refresh();
  }

  return (
    <>
      <h1 className="mb-6 font-display text-3xl">Welcome back</h1>
      <form onSubmit={handleSubmit} className={authFormClassName}>
        <Input
          name="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          required
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          required
        />
        <div className="text-right">
          <Link href="#" className={authLinkClassName}>
            Forgot password?
          </Link>
        </div>
        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}
        <Button
          type="submit"
          loading={loading}
          className={authPrimaryButtonClassName}
        >
          Sign In
        </Button>
      </form>
      <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs leading-5 text-slate-500">
        Don't have an account?{" "}
        <Link href="/register" className={authLinkClassName}>
          Sign up
        </Link>
      </p>
    </>
  );
}
