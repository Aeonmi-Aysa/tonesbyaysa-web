-- Manifestation profiles capture current intention + stats per user
create table if not exists public.manifestation_profiles (
  user_id uuid primary key references auth.users on delete cascade,
  current_intention jsonb,
  stats jsonb default '{}'::jsonb,
  achievements jsonb default '{}'::jsonb,
  last_session_date date,
  updated_at timestamptz default now()
);

create index if not exists manifestation_profiles_updated_idx
  on public.manifestation_profiles (updated_at desc);

-- Composer baths persist custom stacks per account
create table if not exists public.composer_baths (
  user_id uuid references auth.users on delete cascade,
  bath_id text,
  name text not null,
  mode text default 'blend',
  layers jsonb not null,
  saved_at timestamptz default now(),
  primary key (user_id, bath_id)
);

create index if not exists composer_baths_saved_idx
  on public.composer_baths (saved_at desc);

-- Aggregate dashboard stats
create table if not exists public.user_stats (
  user_id uuid primary key references auth.users on delete cascade,
  total_sessions int default 0,
  total_minutes int default 0,
  current_streak int default 0,
  frequencies_tried int default 0,
  updated_at timestamptz default now()
);

-- Enable RLS everywhere
alter table public.manifestation_profiles enable row level security;
alter table public.composer_baths enable row level security;
alter table public.user_stats enable row level security;

-- Policies: each user can only see/update their rows
create policy if not exists "manifestation_profiles_select"
  on public.manifestation_profiles
  for select
  using (auth.uid() = user_id);

create policy if not exists "manifestation_profiles_write"
  on public.manifestation_profiles
  for insert with check (auth.uid() = user_id)
  using (auth.uid() = user_id);

create policy if not exists "composer_baths_select"
  on public.composer_baths
  for select
  using (auth.uid() = user_id);

create policy if not exists "composer_baths_write"
  on public.composer_baths
  for insert, update, delete
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy if not exists "user_stats_select"
  on public.user_stats
  for select
  using (auth.uid() = user_id);

create policy if not exists "user_stats_write"
  on public.user_stats
  for insert, update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
