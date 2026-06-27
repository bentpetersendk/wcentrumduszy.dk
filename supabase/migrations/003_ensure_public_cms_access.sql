alter table public.content_entries enable row level security;
alter table public.media_assets enable row level security;

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

insert into storage.buckets (id, name, public)
values ('media', 'media', true), ('private-media', 'private-media', false)
on conflict (id) do update set public = excluded.public;
