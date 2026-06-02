-- rsvps table (used by Weddingcard — full version)
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(trim(guest_name)) > 0),
  party_size integer not null default 1 check (party_size >= 1),
  attendance text not null check (attendance in ('yes', 'no')),
  food_preference text not null check (food_preference in ('veg', 'non-veg')),
  affiliation text not null default 'both' check (affiliation in ('bride', 'groom', 'both')),
  message text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- rsvps_sa table (used by Weddingcardsa — simple version)
create table if not exists public.rsvps_sa (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(trim(guest_name)) > 0),
  party_size integer not null default 1 check (party_size >= 1),
  attendance text not null check (attendance in ('yes', 'no')),
  food_preference text not null check (food_preference in ('veg', 'non-veg')),
  affiliation text not null default 'both' check (affiliation in ('bride', 'groom', 'both')),
  message text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- trigger for rsvps
create or replace function public.set_rsvps_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_rsvps_updated_at on public.rsvps;
drop trigger if exists set_rsvps_updated_at on public.rsvps_sa;

create trigger set_rsvps_updated_at
before update on public.rsvps
for each row
execute function public.set_rsvps_updated_at();

create trigger set_rsvps_updated_at
before update on public.rsvps_sa
for each row
execute function public.set_rsvps_updated_at();

-- RLS
alter table public.rsvps enable row level security;
alter table public.rsvps_sa enable row level security;

-- INSERT policies
drop policy if exists "Allow anon insert rsvps" on public.rsvps;
create policy "Allow anon insert rsvps"
on public.rsvps
for insert
to anon, authenticated
with check (true);

drop policy if exists "Allow anon insert rsvps_sa" on public.rsvps_sa;
create policy "Allow anon insert rsvps_sa"
on public.rsvps_sa
for insert
to anon, authenticated
with check (true);

-- SELECT policies (for admin dashboard viewing)
drop policy if exists "Allow anon read rsvps" on public.rsvps;
create policy "Allow anon read rsvps"
on public.rsvps
for select
to anon, authenticated
using (true);

drop policy if exists "Allow anon read rsvps_sa" on public.rsvps_sa;
create policy "Allow anon read rsvps_sa"
on public.rsvps_sa
for select
to anon, authenticated
using (true);
