"use client";

import { useState } from "react";
import { Button } from "@/components/system/Button";
import { CheckboxField, TextInput } from "@/components/system/FormControls";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid gap-5 rounded-md border border-border bg-surface p-6 sm:p-8"
      aria-label="Newsletter signup"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <TextInput
        id="newsletter-page-email"
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
      <Button type="submit" className="w-full sm:w-fit">
        Join the newsletter
      </Button>
      {submitted ? (
        <p className="rounded-md border border-success/30 bg-success/10 px-4 py-3 text-small text-text" role="status">
          Thank you. Newsletter storage is prepared for Supabase activation.
        </p>
      ) : null}
    </form>
  );
}
