"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInAction } from "@/lib/cms/actions";
import { Button } from "@/components/system/Button";
import { TextInput } from "@/components/system/FormControls";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, isPending] = useActionState(signInAction, { ok: true, message: "" });

  return (
    <form className="mt-8 grid gap-5 rounded-md border border-border bg-surface p-6" action={formAction} aria-label="Admin sign in">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <TextInput id="email" name="email" label="Email" type="email" autoComplete="email" required />
      <TextInput id="password" name="password" label="Password" type="password" autoComplete="current-password" required />
      <Button type="submit" isLoading={isPending}>Sign in</Button>
      <Link href="/admin/reset-password" className="text-small text-text-muted underline-offset-4 hover:underline">
        Reset password
      </Link>
      {state.message ? (
        <p className={state.ok ? "text-small text-success" : "text-small text-error"} role="status">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
