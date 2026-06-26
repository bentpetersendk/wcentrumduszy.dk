create extension if not exists pgcrypto;

create type public.content_status as enum ('draft', 'scheduled', 'published', 'archived');
create type public.content_type as enum ('page', 'workshop', 'course', 'meditation', 'article', 'gallery', 'faq');
create type public.message_status as enum ('new', 'in_progress', 'handled', 'archived');

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_entries (
  id uuid primary key default gen_random_uuid(),
  type public.content_type not null,
  status public.content_status not null default 'draft',
  slug text not null,
  language text not null default 'pl' check (language in ('pl', 'da', 'en')),
  translation_group_id uuid not null default gen_random_uuid(),
  title text not null,
  subtitle text,
  excerpt text,
  hero_image_path text,
  hero_image_alt text,
  body jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  scheduled_for timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint content_entries_slug_language_unique unique (slug, language),
  constraint content_entries_body_array check (jsonb_typeof(body) = 'array')
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'media',
  path text not null,
  alt text not null default '',
  caption text,
  folder text not null default 'gallery',
  sort_order integer not null default 0,
  mime_type text,
  size_bytes bigint,
  width integer,
  height integer,
  focal_point jsonb not null default '{"x":0.5,"y":0.5}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint media_assets_path_unique unique (bucket, path)
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text not null,
  message text not null,
  status public.message_status not null default 'new',
  consent_at timestamptz not null default now(),
  source_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  language text not null default 'pl' check (language in ('pl', 'da', 'en')),
  source_path text,
  consent_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create index content_entries_type_status_idx on public.content_entries (type, status);
create index content_entries_language_status_idx on public.content_entries (language, status);
create index content_entries_translation_group_idx on public.content_entries (translation_group_id);
create index content_entries_published_idx on public.content_entries (published_at desc) where status = 'published';
create index media_assets_created_at_idx on public.media_assets (created_at desc);
create index media_assets_folder_sort_idx on public.media_assets (folder, sort_order, created_at desc);
create index contact_messages_status_created_idx on public.contact_messages (status, created_at desc);
create index newsletter_subscribers_active_idx on public.newsletter_subscribers (created_at desc) where unsubscribed_at is null;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger admin_profiles_updated_at before update on public.admin_profiles for each row execute function public.set_updated_at();
create trigger content_entries_updated_at before update on public.content_entries for each row execute function public.set_updated_at();
create trigger media_assets_updated_at before update on public.media_assets for each row execute function public.set_updated_at();
create trigger contact_messages_updated_at before update on public.contact_messages for each row execute function public.set_updated_at();
create trigger newsletter_subscribers_updated_at before update on public.newsletter_subscribers for each row execute function public.set_updated_at();
create trigger site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

alter table public.admin_profiles enable row level security;
alter table public.content_entries enable row level security;
alter table public.media_assets enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.site_settings enable row level security;

create policy "Admins can read profiles" on public.admin_profiles for select to authenticated using (auth.uid() = id);
create policy "Editors can read content" on public.content_entries for select to authenticated using (true);
create policy "Editors can write content" on public.content_entries for all to authenticated using (true) with check (true);
create policy "Published content is public" on public.content_entries for select to anon using (status = 'published');
create policy "Editors can manage media" on public.media_assets for all to authenticated using (true) with check (true);
create policy "Media metadata is public" on public.media_assets for select to anon using (true);
create policy "Editors can manage messages" on public.contact_messages for all to authenticated using (true) with check (true);
create policy "Anyone can submit messages" on public.contact_messages for insert to anon with check (true);
create policy "Editors can manage subscribers" on public.newsletter_subscribers for all to authenticated using (true) with check (true);
create policy "Anyone can subscribe" on public.newsletter_subscribers for insert to anon with check (true);
create policy "Editors can manage settings" on public.site_settings for all to authenticated using (true) with check (true);
create policy "Public settings can be read" on public.site_settings for select to anon using (key like 'public.%');

insert into storage.buckets (id, name, public)
values ('media', 'media', true), ('private-media', 'private-media', false)
on conflict (id) do nothing;

create policy "Public media files are readable" on storage.objects for select to anon using (bucket_id = 'media');
create policy "Editors can manage public media files" on storage.objects for all to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');
create policy "Editors can manage private media files" on storage.objects for all to authenticated using (bucket_id = 'private-media') with check (bucket_id = 'private-media');
