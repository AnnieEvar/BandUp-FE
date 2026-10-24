"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROLE_HOME } from "@/lib/auth/roles";
import { useAuth } from "../hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Lock, Mail } from "lucide-react";
import {
  authFormClassName,
  authLinkClassName,
  authPrimaryButtonClassName,
} from "./auth-form.styles";

export default function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const user = await signIn(
        String(form.get("email")),
        String(form.get("password")),
      );
      router.replace(ROLE_HOME[user.role]);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Welcome back
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-600">
        Log in to continue your English journey.
      </p>
      <form onSubmit={handleSubmit} className={authFormClassName}>
        <Input
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          icon={<Mail className="h-4 w-4" />}
          autoComplete="email"
          required
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          icon={<Lock className="h-4 w-4" />}
          autoComplete="current-password"
          required
        />
        <div className="text-right">
          <Link href="/forgot-password" className={authLinkClassName}>
            Forgot password?
          </Link>
        </div>
        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        <Button
          type="submit"
          loading={loading}
          className={authPrimaryButtonClassName}
        >
          Log in
        </Button>
      </form>
      <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
        New to BandUp?{" "}
        <Link href="/register" className={authLinkClassName}>
          Create a free account
        </Link>
      </p>

      {process.env.NEXT_PUBLIC_USE_MOCK === "true" && (
        <p className="mt-4 rounded-lg bg-blue-50 p-3 text-xs text-blue-900">
          Demo: <b>student@bandup.test</b>, <b>volunteer@bandup.test</b> or{" "}
          <b>admin@bandup.test</b> · password <b>12345678</b>
        </p>
      )}
    </>
  );
}
