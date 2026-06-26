"use client";

import { useState } from "react";
import { Button } from "@/components/system/Button";
import { SelectField, TextArea, TextInput } from "@/components/system/FormControls";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid gap-5 rounded-md border border-border bg-surface p-6 sm:p-8"
      aria-label="Contact form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput id="contact-name" label="Name" autoComplete="name" required />
        <TextInput id="contact-email" label="Email" type="email" autoComplete="email" required />
      </div>
      <SelectField id="contact-topic" label="Topic" required defaultValue="">
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
        label="Message"
        required
        helper="Share only what feels useful. Joanna can continue the conversation by email."
      />
      <Button type="submit" className="w-full sm:w-fit">
        Send message
      </Button>
      {submitted ? (
        <p className="rounded-md border border-success/30 bg-success/10 px-4 py-3 text-small text-text" role="status">
          Thank you. The CMS foundation is ready to store this message once Supabase is connected.
        </p>
      ) : null}
    </form>
  );
}
