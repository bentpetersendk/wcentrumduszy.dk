"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonLink } from "@/components/system/Button";
import { SelectField, TextArea, TextInput } from "@/components/system/FormControls";
import { saveContentEntry, setContentStatus, type ActionState } from "@/lib/cms/actions";
import type { CmsContent, ContentStatus } from "@/lib/cms/types";

export function ContentEditor({ content }: { content: CmsContent }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const initialBody = content.body.map((block) => ("text" in block ? block.text : "")).join("\n\n");
  const [draft, setDraft] = useState({ title: content.title, subtitle: content.subtitle, body: initialBody });
  const [status, setStatus] = useState(content.status);
  const [persisted, setPersisted] = useState({ id: content.id, slug: content.slug });
  const [actionMessage, setActionMessage] = useState<ActionState>({ ok: true, message: "Saved" });
  async function saveAndTrack(previousState: ActionState, formData: FormData) {
    formData.set("id", persisted.id);
    formData.set("slug", persisted.slug);
    const result = await saveContentEntry(previousState, formData);
    if (result.ok && result.id) {
      setPersisted((current) => ({ id: result.id ?? current.id, slug: result.slug ?? current.slug }));
      if (result.status) setStatus(result.status);
    }
    return result;
  }

  const [state, formAction, isSaving] = useActionState(saveAndTrack, { ok: true, message: "Saved" });
  const [isPending, startTransition] = useTransition();
  const latestState = isSaving ? { ok: true, message: "Saving..." } : actionMessage.message !== "Saved" || !actionMessage.ok ? actionMessage : state;
  const statusText = latestState.ok ? latestState.message : `Error: ${latestState.message}`;

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (!formRef.current) return;
      startTransition(() => {
        formAction(new FormData(formRef.current as HTMLFormElement));
      });
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [draft, formAction, status]);

  function updateDraft(field: "title" | "subtitle" | "body", value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  async function saveCurrentContent(nextStatus?: ContentStatus) {
    if (!formRef.current) return { ok: false, message: "Editor form is not ready." } satisfies ActionState;

    const formData = new FormData(formRef.current);
    formData.set("id", persisted.id);
    formData.set("slug", persisted.slug);
    if (nextStatus) formData.set("status", nextStatus);

    const result = await saveContentEntry({ ok: true, message: "Saved" }, formData);
    setActionMessage(result);

    if (result.ok && result.id) {
      setPersisted((current) => ({ id: result.id ?? current.id, slug: result.slug ?? current.slug }));
      if (result.status) setStatus(result.status);
    }

    return result;
  }

  function adminEditorPath(slug: string) {
    return `/admin/${content.type}s/${slug}`;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <form ref={formRef} action={formAction} className="grid gap-5 rounded-md border border-border bg-surface p-6" aria-label={`${content.title} editor`}>
        <input type="hidden" name="id" value={persisted.id} />
        <input type="hidden" name="type" value={content.type} />
        <input type="hidden" name="slug" value={persisted.slug} />
        <input type="hidden" name="excerpt" value={content.excerpt} />
        <input type="hidden" name="heroImage" value={content.heroImage ?? ""} />
        <input type="hidden" name="heroImageAlt" value={content.imageAlt ?? ""} />
        <input type="hidden" name="metadata" value={JSON.stringify(content.metadata)} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-small text-text-muted" role="status">
            {statusText}
          </p>
          <div className="flex gap-3">
            <ButtonLink href={content.seo.canonical} variant="secondary" target="_blank">
              Preview
            </ButtonLink>
            <Button type="submit" variant="secondary">Save Draft</Button>
            <Button
              type="button"
              isLoading={isPending}
              onClick={() => {
                startTransition(async () => {
                  const nextStatus = status === "published" ? "draft" : "published";
                  const saved: ActionState = persisted.id
                    ? { ok: true, message: "Saved", id: persisted.id, slug: persisted.slug }
                    : await saveCurrentContent("draft");
                  if (!saved.ok || !saved.id) {
                    setActionMessage({ ok: false, message: saved.message || "Save the article before publishing." });
                    return;
                  }

                  const result = await setContentStatus(saved.id, nextStatus);
                  setActionMessage(result);
                  if (result.ok) {
                    setPersisted((current) => ({ id: result.id ?? current.id, slug: result.slug ?? current.slug }));
                    setStatus(result.status ?? nextStatus);
                    if (!persisted.id && result.slug) router.replace(adminEditorPath(result.slug));
                    router.refresh();
                  }
                });
              }}
            >
              {status === "published" ? "Unpublish" : "Publish"}
            </Button>
          </div>
        </div>
        <TextInput
          id={`${content.id}-title`}
          name="title"
          label="Title"
          value={draft.title}
          onChange={(event) => updateDraft("title", event.target.value)}
        />
        <TextInput
          id={`${content.id}-subtitle`}
          name="subtitle"
          label="Subtitle"
          value={draft.subtitle}
          onChange={(event) => updateDraft("subtitle", event.target.value)}
        />
        <TextArea
          id={`${content.id}-body`}
          name="body"
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
          name="status"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value as ContentStatus);
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
