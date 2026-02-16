-- Dashboard support tables for HealTone UI
-- Creates user_stats and ensures manifestation_profiles carries the expected columns.

create table if not exists public.user_stats (
  user_id uuid primary key references auth.users (id) on delete cascade,
  total_sessions integer default 0,
  total_minutes integer default 0,
  current_streak integer default 0,
  frequencies_tried integer default 0,
  frequency_history jsonb default '[]'::jsonb,
  last_active_date date,
  updated_at timestamptz default timezone('utc', now())
);

alter table public.user_stats
  add column if not exists frequency_history jsonb default '[]'::jsonb;

alter table public.user_stats
  add column if not exists last_active_date date,
  add column if not exists updated_at timestamptz default timezone('utc', now());

alter table public.user_stats
  alter column total_sessions set default 0,
  alter column total_minutes set default 0,
  alter column current_streak set default 0,
  alter column frequencies_tried set default 0,
  alter column frequency_history set default '[]'::jsonb,
  alter column last_active_date drop default;

create table if not exists public.manifestation_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz default timezone('utc', now())
);

alter table public.manifestation_profiles
  add column if not exists current_intention jsonb,
  add column if not exists stats jsonb,
  add column if not exists achievements jsonb,
  add column if not exists last_session_date date,
  add column if not exists updated_at timestamptz default timezone('utc', now());

create index if not exists manifestation_profiles_user_id_idx
  on public.manifestation_profiles (user_id);

alter table if exists public.manifestation_profiles enable row level security;
alter table if exists public.user_stats enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policy
    where polname = 'manifestation_profiles_update'
      and polrelid = 'public.manifestation_profiles'::regclass
  ) then
    create policy "manifestation_profiles_update"
      on public.manifestation_profiles
      for update
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policy
    where polname = 'user_stats_manage'
      and polrelid = 'public.user_stats'::regclass
  ) then
    create policy "user_stats_manage"
      on public.user_stats
      for all
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;
end $$;
