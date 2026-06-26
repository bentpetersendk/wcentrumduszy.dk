import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mapContentRow } from "@/lib/cms/mapper";
import type { CmsContent, CmsMediaAsset, ContactMessage, ContentStatus, ContentType, NewsletterSubscriber } from "@/lib/cms/types";

export async function getContentBySlug({
  slug,
  type,
  status,
  language = "pl"
}: {
  slug: string;
  type?: ContentType;
  status?: ContentStatus;
  language?: "pl" | "da" | "en";
}) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  let query = supabase.from("content_entries").select("*").eq("slug", slug).eq("language", language).limit(1);
  if (type) query = query.eq("type", type);
  if (status) query = query.eq("status", status);

  const { data, error } = await query.maybeSingle();
  if (error || !data) return null;
  return mapContentRow(data);
}

export async function getContentList({
  type,
  status,
  language = "pl"
}: {
  type?: ContentType;
  status?: ContentStatus;
  language?: "pl" | "da" | "en";
} = {}) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  let query = supabase.from("content_entries").select("*").eq("language", language).order("updated_at", { ascending: false });
  if (type) query = query.eq("type", type);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error || !data) return [];
  return data.map(mapContentRow);
}

export async function getPublishedList(type: ContentType) {
  return getContentList({ type, status: "published" });
}

export async function getPublishedSlugParams(type: ContentType) {
  const items = await getPublishedList(type);
  return items.map((item) => ({ slug: item.slug.split("/").at(-1) ?? item.slug }));
}

export async function getMediaAssets() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((asset): CmsMediaAsset => {
    const { data: publicUrl } = supabase.storage.from(asset.bucket).getPublicUrl(asset.path);
    return {
      id: asset.id,
      bucket: asset.bucket,
      path: asset.path,
      alt: asset.alt,
      caption: asset.caption ?? undefined,
      folder: asset.folder ?? undefined,
      sortOrder: asset.sort_order ?? 0,
      createdAt: asset.created_at,
      publicUrl: publicUrl.publicUrl
    };
  });
}

export async function getContactMessages() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(50);
  if (error || !data) return [];

  return data.map((message): ContactMessage => ({
    id: message.id,
    name: message.name,
    email: message.email,
    topic: message.topic,
    message: message.message,
    status: message.status,
    createdAt: message.created_at
  }));
}

export async function getNewsletterSubscribers() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error || !data) return [];

  return data.map((subscriber): NewsletterSubscriber => ({
    id: subscriber.id,
    email: subscriber.email,
    language: subscriber.language,
    sourcePath: subscriber.source_path ?? undefined,
    consentAt: subscriber.consent_at,
    unsubscribedAt: subscriber.unsubscribed_at ?? undefined
  }));
}

export async function getDashboardData() {
  const [content, messages, subscribers] = await Promise.all([getContentList(), getContactMessages(), getNewsletterSubscribers()]);

  return {
    content,
    messages,
    subscribers,
    drafts: content.filter((item) => item.status === "draft"),
    published: content.filter((item) => item.status === "published"),
    upcomingWorkshops: content.filter((item) => item.type === "workshop" && item.status !== "archived"),
    recentlyEdited: content.slice(0, 6)
  };
}

export function contentPath(item: CmsContent) {
  if (item.type === "page") return item.slug ? `/${item.slug}` : "/";
  return `/${item.type}s/${item.slug}`;
}
