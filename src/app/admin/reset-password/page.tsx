"use client";

import { useActionState } from "react";
import { resetPasswordAction } from "@/lib/cms/actions";
import { Button } from "@/components/system/Button";
import { TextInput } from "@/components/system/FormControls";

export default function ResetPasswordPage() {
  const [state, formAction, isPending] = useActionState(resetPasswordAction, { ok: true, message: "" });

  return (
    <section className="mx-auto max-w-md px-5 py-20 sm:px-8">
      <p className="text-caption uppercase text-text-muted">Admin</p>
      <h1 className="mt-2 text-h1 text-text">Reset password</h1>
      <form className="mt-8 grid gap-5 rounded-md border border-border bg-surface p-6" action={formAction} aria-label="Password reset">
        <TextInput id="reset-email" name="email" label="Email" type="email" autoComplete="email" required />
        <Button type="submit" isLoading={isPending}>Send reset email</Button>
        {state.message ? (
          <p className={state.ok ? "text-small text-success" : "text-small text-error"} role="status">
            {state.message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
