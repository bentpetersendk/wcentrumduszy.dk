"use client";

import { useState } from "react";
import { Button } from "@/components/system/Button";
import { TextInput } from "@/components/system/FormControls";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [message, setMessage] = useState("Use the editor account once Supabase Auth is connected.");

  return (
    <section className="mx-auto max-w-md px-5 py-20 sm:px-8">
      <p className="text-caption uppercase text-text-muted">Admin</p>
      <h1 className="mt-2 text-h1 text-text">Sign in</h1>
      <form
        className="mt-8 grid gap-5 rounded-md border border-border bg-surface p-6"
        aria-label="Admin sign in"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const email = String(form.get("email"));
          const password = String(form.get("password"));
          const supabase = createBrowserSupabaseClient();
          if (!supabase) {
            setMessage("Supabase settings are not connected yet.");
            return;
          }
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          setMessage(error ? error.message : "Signed in.");
        }}
      >
        <TextInput id="email" name="email" label="Email" type="email" autoComplete="email" required />
        <TextInput id="password" name="password" label="Password" type="password" autoComplete="current-password" required />
        <Button type="submit">Sign in</Button>
        <p className="text-small text-text-muted" role="status">
          {message}
        </p>
      </form>
    </section>
  );
}
