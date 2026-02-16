# Supabase Foundation

> First deliverable toward a sellable release: lock down schemas, migrations, and policies so Composer + Manifestation data stays consistent across every install.

## Quickstart Checklist
- Install Supabase CLI (`npm install -g supabase`) and authenticate (`supabase login`).
- Reuse the checked-in scaffold (`supabase/config.toml`, `supabase/migrations/`). Run `supabase init` only if you need to regenerate defaults.
- Copy `.env.example` to `.env` (or set the values in your platform secrets) before running the app.
- Apply the SQL below (mirrors `supabase/migrations/20241205120000_initial_schema.sql`) with `supabase db push` or paste into the hosted project's SQL editor.
- Ensure Row Level Security (RLS) stays enabled and policies remain in sync with the migration file.

## Environment Variables
| Variable | Description |
| --- | --- |
| `SUPABASE_URL` | Project URL visible in Supabase settings. |
| `SUPABASE_ANON_KEY` | Public anon key used by the client. |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional: only for server-side scripts or migrations. Never ship in the app. |

Keep these in `.env` and never commit real secrets.

## Tables & Indexes

### 1. `manifestation_profiles`
```
create table if not exists public.manifestation_profiles (
  user_id uuid primary key references auth.users on delete cascade,
  current_intention jsonb,
  stats jsonb default '{}',
  achievements jsonb default '{}',
  last_session_date date,
  updated_at timestamptz default now()
);

create index if not exists manifestation_profiles_updated_idx
  on public.manifestation_profiles (updated_at desc);
```

### 2. `composer_baths`
```
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
```

### 3. `user_stats`
```
create table if not exists public.user_stats (
  user_id uuid primary key references auth.users on delete cascade,
  total_sessions int default 0,
  total_minutes int default 0,
  current_streak int default 0,
  frequencies_tried int default 0,
  updated_at timestamptz default now()
);
```

Add any future analytics tables (e.g., `manifestation_sessions`) inside migrations so changes stay versioned.

## Row Level Security
Enable RLS:
```
alter table public.manifestation_profiles enable row level security;
alter table public.composer_baths enable row level security;
alter table public.user_stats enable row level security;
```
Policies (read/write for the logged-in user only):
```
create policy "read own profile"
  on public.manifestation_profiles
  for select
  using (auth.uid() = user_id);

create policy "write own profile"
  on public.manifestation_profiles
  for insert with check (auth.uid() = user_id)
  using (auth.uid() = user_id);

create policy "read own baths"
  on public.composer_baths
  for select
  using (auth.uid() = user_id);

create policy "write own baths"
  on public.composer_baths
  for insert, update, delete
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "read own stats"
  on public.user_stats
  for select
  using (auth.uid() = user_id);

create policy "write own stats"
  on public.user_stats
  for insert, update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

## Migration Workflow
1. `supabase migration new add-composer-baths`
2. Drop the SQL for schema/policy changes into the generated file under `supabase/migrations/`.
3. Validate locally with `supabase db reset` (spins up a local Postgres + Edge runtime, applies migrations, seeds data).
4. Deploy via `supabase db push` or CI.

Document every change in this file so enterprise buyers can audit the data model quickly.
