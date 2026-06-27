alter table public.admin_profiles enable row level security;
alter table public.content_entries enable row level security;
alter table public.media_assets enable row level security;

do $$
begin
  if to_regclass('public.contact_messages') is not null then
    alter table public.contact_messages enable row level security;
  end if;

  if to_regclass('public.newsletter_subscribers') is not null then
    alter table public.newsletter_subscribers enable row level security;
  end if;

  if to_regclass('public.site_settings') is not null then
    alter table public.site_settings enable row level security;
  end if;
end;
$$;

create or replace function public.current_admin_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.admin_profiles
  where id = auth.uid()
  limit 1
$$;

create or replace function public.is_admin(required_roles text[] default array['owner', 'editor'])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_admin_role() = any(required_roles), false)
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'content_entries'
      and policyname = 'Published content is public'
  ) then
    create policy "Published content is public"
      on public.content_entries
      for select
      to anon
      using (status = 'published');
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'media_assets'
      and policyname = 'Media metadata is public'
  ) then
    create policy "Media metadata is public"
      on public.media_assets
      for select
      to anon
      using (true);
  end if;

  if to_regclass('public.contact_messages') is not null and not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'contact_messages'
      and policyname = 'Anyone can submit messages'
  ) then
    create policy "Anyone can submit messages"
      on public.contact_messages
      for insert
      to anon
      with check (true);
  end if;

  if to_regclass('public.newsletter_subscribers') is not null and not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'newsletter_subscribers'
      and policyname = 'Anyone can subscribe'
  ) then
    create policy "Anyone can subscribe"
      on public.newsletter_subscribers
      for insert
      to anon
      with check (true);
  end if;

  if to_regclass('public.site_settings') is not null and not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'site_settings'
      and policyname = 'Public settings can be read'
  ) then
    create policy "Public settings can be read"
      on public.site_settings
      for select
      to anon
      using (key like 'public.%');
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public media files are readable'
  ) then
    create policy "Public media files are readable"
      on storage.objects
      for select
      to anon
      using (bucket_id = 'media');
  end if;
end;
$$;

drop policy if exists "Admins can read profiles" on public.admin_profiles;
drop policy if exists "Owners can manage admin profiles" on public.admin_profiles;
drop policy if exists "Editors can read content" on public.content_entries;
drop policy if exists "Editors can write content" on public.content_entries;
drop policy if exists "Editors can insert content" on public.content_entries;
drop policy if exists "Editors can update content" on public.content_entries;
drop policy if exists "Editors can delete content" on public.content_entries;
drop policy if exists "Editors can read media" on public.media_assets;
drop policy if exists "Editors can manage media" on public.media_assets;
drop policy if exists "Editors can insert media" on public.media_assets;
drop policy if exists "Editors can update media" on public.media_assets;
drop policy if exists "Editors can delete media" on public.media_assets;
drop policy if exists "Editors can manage public media files" on storage.objects;
drop policy if exists "Editors can manage private media files" on storage.objects;
drop policy if exists "Editors can read media files" on storage.objects;
drop policy if exists "Editors can upload media files" on storage.objects;
drop policy if exists "Editors can update media files" on storage.objects;
drop policy if exists "Editors can delete media files" on storage.objects;

create policy "Admins can read profiles"
  on public.admin_profiles
  for select
  to authenticated
  using (id = auth.uid() or public.is_admin(array['owner']));

create policy "Owners can manage admin profiles"
  on public.admin_profiles
  for all
  to authenticated
  using (public.is_admin(array['owner']))
  with check (public.is_admin(array['owner']));

create policy "Editors can read content"
  on public.content_entries
  for select
  to authenticated
  using (public.is_admin());

create policy "Editors can insert content"
  on public.content_entries
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Editors can update content"
  on public.content_entries
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Editors can delete content"
  on public.content_entries
  for delete
  to authenticated
  using (public.is_admin());

create policy "Editors can read media"
  on public.media_assets
  for select
  to authenticated
  using (public.is_admin());

create policy "Editors can insert media"
  on public.media_assets
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Editors can update media"
  on public.media_assets
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Editors can delete media"
  on public.media_assets
  for delete
  to authenticated
  using (public.is_admin());

do $$
begin
  if to_regclass('public.contact_messages') is not null then
    drop policy if exists "Editors can manage messages" on public.contact_messages;
    drop policy if exists "Editors can read messages" on public.contact_messages;
    drop policy if exists "Editors can update messages" on public.contact_messages;
    drop policy if exists "Editors can delete messages" on public.contact_messages;

    create policy "Editors can read messages"
      on public.contact_messages
      for select
      to authenticated
      using (public.is_admin());

    create policy "Editors can update messages"
      on public.contact_messages
      for update
      to authenticated
      using (public.is_admin())
      with check (public.is_admin());

    create policy "Editors can delete messages"
      on public.contact_messages
      for delete
      to authenticated
      using (public.is_admin());
  end if;

  if to_regclass('public.newsletter_subscribers') is not null then
    drop policy if exists "Editors can manage subscribers" on public.newsletter_subscribers;
    drop policy if exists "Editors can read subscribers" on public.newsletter_subscribers;
    drop policy if exists "Editors can update subscribers" on public.newsletter_subscribers;
    drop policy if exists "Editors can delete subscribers" on public.newsletter_subscribers;

    create policy "Editors can read subscribers"
      on public.newsletter_subscribers
      for select
      to authenticated
      using (public.is_admin());

    create policy "Editors can update subscribers"
      on public.newsletter_subscribers
      for update
      to authenticated
      using (public.is_admin())
      with check (public.is_admin());

    create policy "Editors can delete subscribers"
      on public.newsletter_subscribers
      for delete
      to authenticated
      using (public.is_admin());
  end if;

  if to_regclass('public.site_settings') is not null then
    drop policy if exists "Editors can manage settings" on public.site_settings;
    drop policy if exists "Editors can read settings" on public.site_settings;
    drop policy if exists "Editors can update settings" on public.site_settings;
    drop policy if exists "Editors can insert settings" on public.site_settings;
    drop policy if exists "Editors can delete settings" on public.site_settings;

    create policy "Editors can read settings"
      on public.site_settings
      for select
      to authenticated
      using (public.is_admin());

    create policy "Editors can insert settings"
      on public.site_settings
      for insert
      to authenticated
      with check (public.is_admin());

    create policy "Editors can update settings"
      on public.site_settings
      for update
      to authenticated
      using (public.is_admin())
      with check (public.is_admin());

    create policy "Editors can delete settings"
      on public.site_settings
      for delete
      to authenticated
      using (public.is_admin());
  end if;
end;
$$;

create policy "Editors can read media files"
  on storage.objects
  for select
  to authenticated
  using (bucket_id in ('media', 'private-media') and public.is_admin());

create policy "Editors can upload media files"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id in ('media', 'private-media') and public.is_admin());

create policy "Editors can update media files"
  on storage.objects
  for update
  to authenticated
  using (bucket_id in ('media', 'private-media') and public.is_admin())
  with check (bucket_id in ('media', 'private-media') and public.is_admin());

create policy "Editors can delete media files"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id in ('media', 'private-media') and public.is_admin());
