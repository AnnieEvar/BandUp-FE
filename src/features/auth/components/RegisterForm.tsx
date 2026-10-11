"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Lock, Mail } from "lucide-react";
import {
  authFormClassName,
  authLinkClassName,
  authPrimaryButtonClassName,
} from "./auth-form.styles";

export default function RegisterForm() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password"));
    if (password !== String(f.get("confirmPassword"))) return setError("Passwords do not match.");

    setLoading(true);
    try {
      const { needsEmailConfirm } = await signUp({
        email: String(f.get("email")), password,
        firstName: String(f.get("first")), lastName: String(f.get("last")),
      });
      if (needsEmailConfirm) setDone(true);   // Supabase: chờ xác nhận email
      else router.replace("/student");        // mock: vào thẳng dashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Check your email
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          We&apos;ve sent a confirmation link to your inbox.
        </p>
        <Link
          href="/login"
          className={`mt-6 inline-block text-sm ${authLinkClassName}`}
        >
          Back to Sign in
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Join as a student
      </h1>

      <p className="mb-6 text-sm text-slate-600">
        Create your free learner account in under a minute.
      </p>

      <form onSubmit={handleSubmit} className={authFormClassName}>
        <div className="grid grid-cols-2 gap-3">
          <Input name="first" label="First Name" placeholder="An" required />
          <Input name="last" label="Last Name" placeholder="Nguyen" required />
        </div>

        <Input
          name="email"
          type="email"
          icon={<Mail className="h-4 w-4" />}
          label="Email Address"
          placeholder="you@example.com"
          required
        />

        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="At least 8 characters"
          minLength={8}
          required
        />

        <Input
          name="confirmPassword"
          type="password"
          icon={<Lock className="h-4 w-4" />}
          label="Confirm Password"
          placeholder="Re-enter your password"
          minLength={8}
          required
        />

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          loading={loading}
          className={authPrimaryButtonClassName}
        >
          Create my account
        </Button>
      </form>

      <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm leading-5 text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className={authLinkClassName}>
          Sign in
        </Link>
      </p>
    </>
  );
}
