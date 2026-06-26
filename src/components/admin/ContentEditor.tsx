"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, ButtonLink } from "@/components/system/Button";
import { SelectField, TextArea, TextInput } from "@/components/system/FormControls";
import type { PageContent } from "@/lib/content";

export function ContentEditor({ content }: { content: PageContent }) {
  const storageKey = useMemo(() => `wcd-cms-draft-${content.id}`, [content.id]);
  const initialBody = content.body.map((block) => ("text" in block ? block.text : "")).join("\n\n");
  const [draft, setDraft] = useState(() => {
    if (typeof window === "undefined") {
      return { title: content.title, subtitle: content.subtitle, body: initialBody };
    }

    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      return { title: content.title, subtitle: content.subtitle, body: initialBody };
    }

    try {
      const parsed = JSON.parse(saved) as { title?: string; subtitle?: string; body?: string };
      return {
        title: parsed.title ?? content.title,
        subtitle: parsed.subtitle ?? content.subtitle,
        body: parsed.body ?? initialBody
      };
    } catch {
      return { title: content.title, subtitle: content.subtitle, body: initialBody };
    }
  });
  const [status, setStatus] = useState(content.status);
  const [saveState, setSaveState] = useState<"Saved" | "Saving" | "Unsaved changes">("Saved");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSaveState("Saving");
      window.localStorage.setItem(storageKey, JSON.stringify({ ...draft, status }));
      window.setTimeout(() => setSaveState("Saved"), 250);
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [draft, status, storageKey]);

  function updateDraft(field: "title" | "subtitle" | "body", value: string) {
    setSaveState("Unsaved changes");
    setDraft((current) => ({ ...current, [field]: value }));
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <form className="grid gap-5 rounded-md border border-border bg-surface p-6" aria-label={`${content.title} editor`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-small text-text-muted" role="status">
            {saveState}
          </p>
          <div className="flex gap-3">
            <ButtonLink href={content.seo.canonical} variant="secondary" target="_blank">
              Preview
            </ButtonLink>
            <Button type="button">Publish</Button>
          </div>
        </div>
        <TextInput
          id={`${content.id}-title`}
          label="Title"
          value={draft.title}
          onChange={(event) => updateDraft("title", event.target.value)}
        />
        <TextInput
          id={`${content.id}-subtitle`}
          label="Subtitle"
          value={draft.subtitle}
          onChange={(event) => updateDraft("subtitle", event.target.value)}
        />
        <TextArea
          id={`${content.id}-body`}
          label="Rich text blocks"
          value={draft.body}
          onChange={(event) => updateDraft("body", event.target.value)}
          helper="The production CMS schema stores this as structured blocks."
        />
      </form>
      <aside className="h-fit rounded-md border border-border bg-surface p-6">
        <SelectField
          id={`${content.id}-status`}
          label="Status"
          value={status}
          onChange={(event) => {
            setSaveState("Unsaved changes");
            setStatus(event.target.value as PageContent["status"]);
          }}
        >
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </SelectField>
        <div className="mt-6 border-t border-border pt-5">
          <p className="text-small text-text">SEO</p>
          <p className="mt-2 text-small text-text-muted">{content.seo.title}</p>
          <p className="mt-2 text-small text-text-muted">{content.seo.description}</p>
        </div>
        <div className="mt-6 border-t border-border pt-5">
          <p className="text-small text-text">Translation group</p>
          <p className="mt-2 text-small text-text-muted">{content.translationGroupId}</p>
        </div>
      </aside>
    </section>
  );
}
