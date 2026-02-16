-- Frequency catalog + monetization tables
create extension if not exists "pgcrypto";

create table if not exists public.frequency_tiers (
  id text primary key,
  name text not null,
  price_usd numeric(8,2) not null default 0,
  cta text,
  perks text[] default '{}',
  includes_packs text[] default '{}',
  pack_discounts jsonb default '{}'::jsonb,
  description text,
  stripe_price_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.frequency_packs (
  id text primary key,
  title text not null,
  subtitle text,
  badge text,
  price_usd numeric(8,2) not null,
  included_in_tiers text[] default '{}',
  icon text,
  is_add_on boolean not null default false,
  includes text[] default '{}',
  story text,
  stripe_price_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create type public.frequency_type as enum ('single', 'bath', 'sequence', 'binaural', 'isochronic');

create table if not exists public.frequency_catalog (
  id text primary key,
  name text not null,
  hz double precision[] not null,
  category text not null,
  type public.frequency_type not null,
  tier_access text references public.frequency_tiers(id) on update cascade,
  pack_ids text[] default '{}',
  tags text[] default '{}',
  benefits text[] default '{}',
  usage text,
  notes text,
  waveform jsonb,
  duration_seconds integer,
  evidence text,
  references text[] default '{}',
  legacy_source text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists frequency_catalog_category_idx on public.frequency_catalog (category);
create index if not exists frequency_catalog_tier_idx on public.frequency_catalog (tier_access);
create index if not exists frequency_catalog_tags_gin on public.frequency_catalog using gin (tags);
create index if not exists frequency_catalog_pack_ids_gin on public.frequency_catalog using gin (pack_ids);

create table if not exists public.email_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  consent boolean default true,
  created_at timestamptz not null default now()
);

alter table public.frequency_tiers enable row level security;
alter table public.frequency_packs enable row level security;
alter table public.frequency_catalog enable row level security;
alter table public.email_signups enable row level security;

create policy if not exists "frequency_tiers_public_read"
  on public.frequency_tiers
  for select using (true);

create policy if not exists "frequency_tiers_service_write"
  on public.frequency_tiers
  for insert, update, delete
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy if not exists "frequency_packs_public_read"
  on public.frequency_packs
  for select using (true);

create policy if not exists "frequency_packs_service_write"
  on public.frequency_packs
  for insert, update, delete
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy if not exists "frequency_catalog_public_read"
  on public.frequency_catalog
  for select using (true);

create policy if not exists "frequency_catalog_service_write"
  on public.frequency_catalog
  for insert, update, delete
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy if not exists "email_signups_public_insert"
  on public.email_signups
  for insert with check (true);

create policy if not exists "email_signups_service_read"
  on public.email_signups
  for select using (auth.role() = 'service_role');

create policy if not exists "email_signups_service_delete"
  on public.email_signups
  for delete using (auth.role() = 'service_role');
