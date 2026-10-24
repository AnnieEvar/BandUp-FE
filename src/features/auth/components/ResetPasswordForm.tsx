"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { USE_MOCK } from "../context/AuthProvider";
import { useAuth } from "../hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  authFormClassName,
  authLinkClassName,
  authPrimaryButtonClassName,
} from "./auth-form.styles";

export default function ResetPasswordForm() {
  const { user, loading, updatePassword, signOut } = useAuth();
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password"));
    if (password !== String(f.get("confirmPassword"))) {
      return setError("Passwords do not match.");
    }
    setSaving(true);
    try {
      await updatePassword(password);
      setDone(true);
      // End the recovery session so the student logs in with the new password
      await signOut().catch(() => undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (done) {
    return (
      <div className="text-center" role="status">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Password updated
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          You can now log in with your new password.
        </p>
        <Link
          href="/login"
          className={`mt-6 inline-block text-sm ${authLinkClassName}`}
        >
          Go to log in
        </Link>
      </div>
    );
  }

  // Real mode: the emailed link signs the user in via a recovery session
  if (!USE_MOCK && loading) {
    return (
      <p role="status" className="text-sm text-slate-600">
        Checking your reset link...
      </p>
    );
  }

  if (!USE_MOCK && !user) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          This link has expired
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Reset links can only be used once and expire after a short time.
        </p>
        <Link
          href="/forgot-password"
          className={`mt-6 inline-block text-sm ${authLinkClassName}`}
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Choose a new password
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-600">
        Use at least 8 characters.
      </p>
      <form onSubmit={handleSubmit} className={authFormClassName}>
        <Input
          name="password"
          type="password"
          label="New password"
          placeholder="At least 8 characters"
          icon={<Lock className="h-4 w-4" />}
          autoComplete="new-password"
          minLength={8}
          required
        />
        <Input
          name="confirmPassword"
          type="password"
          label="Confirm new password"
          placeholder="Re-enter your new password"
          icon={<Lock className="h-4 w-4" />}
          autoComplete="new-password"
          minLength={8}
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
          loading={saving}
          className={authPrimaryButtonClassName}
        >
          Update password
        </Button>
      </form>
    </>
  );
}