export type ContentStatus = "draft" | "published" | "scheduled" | "archived";
export type ContentType = "page" | "workshop" | "course" | "meditation" | "article" | "gallery" | "faq";

export type RichTextBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "callout"; text: string }
  | { type: "list"; style: "bullet" | "numbered"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "youtube"; url: string; title: string };

export type SeoFields = {
  title: string;
  description: string;
  canonical: string;
  socialImage?: string;
};

export type CmsContent = {
  id: string;
  type: ContentType;
  slug: string;
  language: "pl" | "da" | "en";
  translationGroupId: string;
  status: ContentStatus;
  title: string;
  subtitle: string;
  excerpt: string;
  heroImage?: string;
  imageAlt?: string;
  body: RichTextBlock[];
  seo: SeoFields;
  updatedAt: string;
  publishedAt?: string;
  metadata: Record<string, string | string[] | { question: string; answer: string }[] | undefined>;
};

export type CmsMediaAsset = {
  id: string;
  bucket: string;
  path: string;
  alt: string;
  caption?: string;
  folder?: string;
  sortOrder: number;
  createdAt: string;
  publicUrl?: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: "new" | "in_progress" | "handled" | "archived";
  createdAt: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  language: "pl" | "da" | "en";
  sourcePath?: string;
  consentAt: string;
  unsubscribedAt?: string;
};

export type ContentRow = {
  id: string;
  type: ContentType;
  status: ContentStatus;
  slug: string;
  language: "pl" | "da" | "en";
  translation_group_id: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  hero_image_path: string | null;
  hero_image_alt: string | null;
  body: RichTextBlock[];
  metadata: CmsContent["metadata"];
  seo: Partial<SeoFields>;
  published_at: string | null;
  updated_at: string;
};
