"use client";

import { useActionState } from "react";
import { submitContactMessage } from "@/lib/cms/actions";
import { Button } from "@/components/system/Button";
import { SelectField, TextArea, TextInput } from "@/components/system/FormControls";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactMessage, { ok: true, message: "" });

  return (
    <form
      id="contact-form"
      className="grid gap-5 rounded-md border border-border bg-surface p-6 sm:p-8"
      aria-label="Contact form"
      action={formAction}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput id="contact-name" name="name" label="Name" autoComplete="name" required />
        <TextInput id="contact-email" name="email" label="Email" type="email" autoComplete="email" required />
      </div>
      <SelectField id="contact-topic" name="topic" label="Topic" required defaultValue="">
        <option value="" disabled>
          Choose a topic
        </option>
        <option>Workshop inquiry</option>
        <option>Family constellations</option>
        <option>Meditations</option>
        <option>General question</option>
      </SelectField>
      <TextArea
        id="contact-message"
        name="message"
        label="Message"
        required
        helper="Share only what feels useful. Joanna can continue the conversation by email."
      />
      <Button type="submit" isLoading={isPending} className="w-full sm:w-fit">
        Send message
      </Button>
      {state.message ? (
        <p className={`rounded-md border px-4 py-3 text-small text-text ${state.ok ? "border-success/30 bg-success/10" : "border-error/30 bg-error/10"}`} role="status">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
