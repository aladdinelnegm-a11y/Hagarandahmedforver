-- Run in Supabase SQL Editor. Public wishes are readable by everyone.
create table if not exists public.wedding_wishes (
  id bigint generated always as identity primary key,
  guest_name text not null check (char_length(trim(guest_name)) between 1 and 60),
  message text not null check (char_length(trim(message)) between 1 and 500),
  created_at timestamptz not null default now()
);
alter table public.wedding_wishes enable row level security;
revoke all on public.wedding_wishes from anon, authenticated;
grant select, insert on public.wedding_wishes to anon, authenticated;
grant usage on sequence public.wedding_wishes_id_seq to anon, authenticated;
create policy "Everyone can read wishes" on public.wedding_wishes for select to anon, authenticated using (true);
create policy "Guests can submit wishes" on public.wedding_wishes for insert to anon, authenticated with check (true);
-- Public submissions can be abused. Enable CAPTCHA/rate limiting before wide sharing.
