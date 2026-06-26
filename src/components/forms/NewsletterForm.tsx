"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/lib/cms/actions";
import { Button } from "@/components/system/Button";
import { CheckboxField, TextInput } from "@/components/system/FormControls";

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, { ok: true, message: "" });

  return (
    <form
      className="grid gap-5 rounded-md border border-border bg-surface p-6 sm:p-8"
      aria-label="Newsletter signup"
      action={formAction}
    >
      <input type="hidden" name="sourcePath" value="/newsletter" />
      <TextInput
        id="newsletter-page-email"
        name="email"
        label="Email address"
        type="email"
        autoComplete="email"
        helper="Occasional notes, articles, meditations, and workshop updates."
        required
      />
      <CheckboxField
        id="newsletter-consent"
        label="I agree to receive the W Centrum Duszy newsletter."
        helper="You can unsubscribe at any time."
        required
      />
      <Button type="submit" isLoading={isPending} className="w-full sm:w-fit">
        Join the newsletter
      </Button>
      {state.message ? (
        <p className={`rounded-md border px-4 py-3 text-small text-text ${state.ok ? "border-success/30 bg-success/10" : "border-error/30 bg-error/10"}`} role="status">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
