"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ContentStatus, ContentType, RichTextBlock } from "@/lib/cms/types";

export type ActionState = { ok: boolean; message: string; id?: string; slug?: string; status?: ContentStatus };

async function requireUser() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { supabase: null, user: null };

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return { supabase, user };
}

function bodyFromText(text: string): RichTextBlock[] {
  return text
    .split(/\n{2,}/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map((text) => ({ type: "paragraph", text }));
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function publicContentPath(type: ContentType, slug: string) {
  if (type === "page") return slug ? `/${slug}` : "/";
  return `/${type}s/${slug}`;
}

function revalidateContentPaths(type: ContentType, slug: string) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/admin/${type}s`);
  if (slug) {
    revalidatePath(publicContentPath(type, slug));
    revalidatePath(`/admin/${type}s/${slug}`);
  }
}

function contentPayload(formData: FormData) {
  const rawSlug = String(formData.get("slug") ?? "").replace(/^\/+/, "").replace(/\/+$/, "");
  const title = String(formData.get("title") ?? "");
  const subtitle = String(formData.get("subtitle") ?? "");
  const excerpt = String(formData.get("excerpt") ?? subtitle);
  const body = bodyFromText(String(formData.get("body") ?? ""));
  const status = String(formData.get("status") ?? "draft") as ContentStatus;
  const type = String(formData.get("type") ?? "page") as ContentType;
  const heroImage = String(formData.get("heroImage") ?? "");
  const heroImageAlt = String(formData.get("heroImageAlt") ?? "");
  const metadata = JSON.parse(String(formData.get("metadata") || "{}")) as Record<string, unknown>;
  const isNewPlaceholderSlug = rawSlug === "" || rawSlug === `new-${type}`;
  const slug = isNewPlaceholderSlug ? `${slugify(title) || type}-${Date.now().toString(36)}` : slugify(rawSlug);
  const canonical = publicContentPath(type, slug);

  return {
    type,
    slug,
    language: "pl",
    status,
    title,
    subtitle,
    excerpt,
    hero_image_path: heroImage || null,
    hero_image_alt: heroImageAlt || null,
    body,
    metadata,
    seo: {
      title,
      description: excerpt,
      canonical,
      socialImage: heroImage || undefined
    },
    published_at: status === "published" ? new Date().toISOString() : null
  };
}

export async function saveContentEntry(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await requireUser();
  if (!supabase || !user) return { ok: false, message: "Sign in to save changes." };

  const id = String(formData.get("id") ?? "");
  const payload = contentPayload(formData);
  const mutation = id
    ? supabase.from("content_entries").update({ ...payload, updated_by: user.id }).eq("id", id).select("id").single()
    : supabase.from("content_entries").insert({ ...payload, created_by: user.id, updated_by: user.id }).select("id").single();

  const { data, error } = await mutation;
  if (error) return { ok: false, message: error.message };

  revalidateContentPaths(payload.type, payload.slug);

  return { ok: true, message: "Saved", id: data.id, slug: payload.slug, status: payload.status };
}

export async function setContentStatus(id: string, status: ContentStatus): Promise<ActionState> {
  const { supabase, user } = await requireUser();
  if (!supabase || !user) return { ok: false, message: "Sign in to publish changes." };

  const { data, error } = await supabase
    .from("content_entries")
    .update({
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      updated_by: user.id
    })
    .eq("id", id)
    .select("id, slug, type, status")
    .single();

  if (error) return { ok: false, message: error.message };

  revalidateContentPaths(data.type, data.slug);
  return { ok: true, message: status === "published" ? "Published" : "Updated", id: data.id, slug: data.slug, status: data.status };
}

export async function deleteContentEntry(id: string): Promise<ActionState> {
  const { supabase, user } = await requireUser();
  if (!supabase || !user) return { ok: false, message: "Sign in to delete content." };

  const { error } = await supabase.from("content_entries").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin");
  return { ok: true, message: "Deleted" };
}

export async function signInAction(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { ok: false, message: "Supabase environment variables are not configured." };

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { ok: false, message: error.message };
  redirect(String(formData.get("redirectTo") || "/admin"));
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

export async function resetPasswordAction(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { ok: false, message: "Supabase environment variables are not configured." };

  const email = String(formData.get("email") ?? "");
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin/reset-password`
  });

  return error ? { ok: false, message: error.message } : { ok: true, message: "Password reset email sent." };
}

export async function submitContactMessage(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { ok: false, message: "Message storage is not configured yet." };

  const { error } = await supabase.from("contact_messages").insert({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    topic: String(formData.get("topic") ?? ""),
    message: String(formData.get("message") ?? ""),
    source_path: "/contact"
  });

  return error ? { ok: false, message: error.message } : { ok: true, message: "Message sent." };
}

export async function subscribeNewsletter(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { ok: false, message: "Newsletter storage is not configured yet." };

  const { error } = await supabase.from("newsletter_subscribers").insert({
    email: String(formData.get("email") ?? ""),
    language: "pl",
    source_path: String(formData.get("sourcePath") ?? "/newsletter"),
    consent_at: new Date().toISOString(),
    unsubscribed_at: null
  });

  if (error && error.code !== "23505") return { ok: false, message: error.message };
  return { ok: true, message: "Subscribed." };
}

export async function uploadMedia(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await requireUser();
  if (!supabase || !user) return { ok: false, message: "Sign in to upload media." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: "Choose a file to upload." };

  const folder = String(formData.get("folder") || "gallery").replace(/[^a-z0-9-_]/gi, "-").toLowerCase();
  const fileName = `${folder}/${crypto.randomUUID()}-${file.name.replace(/[^a-z0-9.-]/gi, "-").toLowerCase()}`;
  const { error: uploadError } = await supabase.storage.from("media").upload(fileName, file, {
    cacheControl: "31536000",
    upsert: false
  });

  if (uploadError) return { ok: false, message: uploadError.message };

  const { error } = await supabase.from("media_assets").insert({
    bucket: "media",
    path: fileName,
    folder,
    alt: String(formData.get("alt") ?? ""),
    caption: String(formData.get("caption") ?? ""),
    mime_type: file.type,
    size_bytes: file.size,
    created_by: user.id
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return error ? { ok: false, message: error.message } : { ok: true, message: "Uploaded" };
}

export async function uploadMediaForm(formData: FormData): Promise<void> {
  await uploadMedia({ ok: true, message: "" }, formData);
}

export async function deleteMediaAsset(id: string, bucket: string, path: string): Promise<ActionState> {
  const { supabase, user } = await requireUser();
  if (!supabase || !user) return { ok: false, message: "Sign in to delete media." };

  await supabase.storage.from(bucket).remove([path]);
  const { error } = await supabase.from("media_assets").delete().eq("id", id);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return error ? { ok: false, message: error.message } : { ok: true, message: "Deleted" };
}

export async function deleteMediaAssetForm(id: string, bucket: string, path: string): Promise<void> {
  await deleteMediaAsset(id, bucket, path);
}
