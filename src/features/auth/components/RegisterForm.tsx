"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  authFormClassName,
  authLinkClassName,
  authPrimaryButtonClassName,
} from "./auth-form.styles";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);

    const { error: signUpError } = await createClient().auth.signUp({
      email: String(formData.get("email")),
      password,
      options: {
        data: {
          first_name: formData.get("first"),
          last_name: formData.get("last"),
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div className="text-center text-[#1E293B] [font-family:Inter,sans-serif]">
        <h1 className="text-2xl font-semibold tracking-tight">
          Check your email
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
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
    <div className="text-[#1E293B] [font-family:Inter,sans-serif]">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">
        Create an account
      </h1>

      <p className="mb-6 text-sm text-slate-500">
        Start learning with your student account.
      </p>

      <form onSubmit={handleSubmit} className={authFormClassName}>
        <div className="grid grid-cols-2 gap-3">
          <Input name="first" label="First Name" placeholder="An" required />
          <Input name="last" label="Last Name" placeholder="Nguyen" required />
        </div>

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
          placeholder="At least 8 characters"
          minLength={8}
          required
        />

        <Input
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          minLength={8}
          required
        />

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-600"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          loading={loading}
          className={authPrimaryButtonClassName}
        >
          Create account
        </Button>
      </form>

      <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs leading-5 text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className={authLinkClassName}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
