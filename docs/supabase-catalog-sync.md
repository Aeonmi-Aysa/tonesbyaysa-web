# Supabase Catalog Sync Playbook

_Last updated: 2025-12-06_

This document explains how to keep Supabase in lock-step with the new unified frequency catalog. It covers the schema additions, migration commands, and a repeatable seed/export flow.

## 1. Schema Overview
- `frequency_tiers`: Free / Weekly / Lifetime metadata (price, CTA copy, Stripe price IDs, pack discounts).
- `frequency_packs`: Core + specialty packs, tier entitlements, and marketing copy.
- `frequency_catalog`: Authoritative record for every tone/bath with tier + pack references, `hz[]`, `tags`, `evidence`, etc.
- `email_signups`: Stores captured emails when the free tier gate triggers.

All tables ship with:
- Public read access (so the desktop/web shell can browse catalog + pricing without auth friction).
- Service-role write policies (only Supabase service key / server functions can mutate catalog data).
- `gin` indexes on `tags` / `pack_ids` to make search + filtering fast.

The full SQL lives in `supabase/migrations/20251206090000_catalog_tables.sql`.

## 2. Apply Migrations
```bash
# ensure Supabase CLI is authenticated first
supabase login

# pull latest remote DB (optional)
supabase db pull

# apply new catalog tables locally, then push upward
supabase db reset   # drops + recreates local dev DB with all migrations
supabase db push    # runs pending migrations against the linked project
```

## 3. Export Data From the App
`data/frequency-catalog.js` is the source of truth inside the repo. Run the export helper to emit a JSON payload that Supabase can ingest:

```bash
npm run export:catalog
# ➜ build/frequency-catalog.json (catalog + packs + tiers)
```

The resulting file structure:
```json
{
  "exportedAt": "2025-12-06T05:55:12.000Z",
  "frequencyCatalog": [...],
  "frequencyPacks": [...],
  "frequencyTiers": [...]
}
```

## 4. Seed Supabase From JSON
You can seed the remote database in two quick passes (tiers/packs first, then catalog):

```bash
supabase db remote commit "Seed frequency meta"
supabase db remote exec <<'SQL'
  truncate table public.frequency_tiers restart identity cascade;
  truncate table public.frequency_packs restart identity cascade;
  truncate table public.frequency_catalog restart identity cascade;
SQL

node scripts/export-frequency-catalog.mjs
psql "$(supabase db show-url)" \
  --command="\copy public.frequency_tiers (id,name,price_usd,cta,perks,includes_packs,pack_discounts,description,stripe_price_id) \
            from program 'jq -r \".frequencyTiers[] | [ .id, .name, .price_usd, .cta, (\(.perks)//[] | @json), (\(.includes_packs)//[] | @json), (\(.pack_discounts)//{} | @json), .description, .stripe_price_id ] | @csv\" build/frequency-catalog.json' \
            with csv";
```

> **Tip:** For bulk upserts from JSON, `pgmq` or a short Node script using the Supabase service role key (`SUPABASE_SERVICE_KEY`) is easier than stacking `COPY` commands. The CLI example above shows the general approach—adapt as needed.

## 5. Email Signup Flow
1. When a free user hits the playback gate, post to `email_signups` with `{ email, source: 'library_gate', consent: true }` using the **anon** key (policy allows public inserts).
2. Marketing / CRM exporters should query with the **service** key or through a serverless function, leveraging the `email_signups_service_read` policy.

## 6. Next Steps
- Add a Supabase Edge Function (`sync-frequency-catalog`) that ingests the JSON export and upserts the three tables server-side (batching and logging included).
- Introduce a nightly GitHub Action that runs `npm run export:catalog`, compares against the remote dataset, and raises a PR or auto-sync when differences are detected.
- Extend the catalog export to include upcoming specialty packs once we grow past the legacy presets.
