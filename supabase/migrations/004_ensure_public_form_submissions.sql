alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;

do $$
begin
  if not exists (
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

  if not exists (
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
end;
$$;
