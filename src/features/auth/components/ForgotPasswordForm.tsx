"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { MOCK_RESET_FAIL_EMAIL } from "@/lib/mock/localAuth";
import { USE_MOCK } from "../context/AuthProvider";
import { useAuth } from "../hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  authFormClassName,
  authLinkClassName,
  authPrimaryButtonClassName,
} from "./auth-form.styles";

export default function ForgotPasswordForm() {
  const { requestPasswordReset } = useAuth();
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const email = String(new FormData(e.currentTarget).get("email")).trim();
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSentTo(email); // only after the request really succeeded
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (sentTo) {
    return (
      <div className="text-center" role="status">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Check your email
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          If an account exists for <b className="text-slate-900">{sentTo}</b>,
          we&apos;ve sent a link to reset your password.
        </p>
        {USE_MOCK && (
          <p className="mt-4 rounded-lg bg-blue-50 p-3 text-xs text-blue-900">
            Demo mode: no email was sent.{" "}
            <Link href="/reset-password" className="font-semibold underline">
              Open the reset page
            </Link>{" "}
            to finish the flow.
          </p>
        )}
        <Link
          href="/login"
          className={`mt-6 inline-block text-sm ${authLinkClassName}`}
        >
          Back to log in
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Forgot your password?
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-600">
        Enter your email and we will send you a reset link.
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
          Send reset link
        </Button>
      </form>
      <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
        <Link href="/login" className={authLinkClassName}>
          Back to log in
        </Link>
      </p>
      {USE_MOCK && (
        <p className="mt-4 rounded-lg bg-blue-50 p-3 text-xs text-blue-900">
          Demo mode: no email is sent. Use <b>{MOCK_RESET_FAIL_EMAIL}</b> to
          preview the error state.
        </p>
      )}
    </>
  );
}
