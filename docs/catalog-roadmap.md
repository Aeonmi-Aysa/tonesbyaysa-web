# HealTone Frequency Catalog Roadmap

_Last updated: 2025-12-06_

This note captures how we are expanding the catalog, organizing tiers, and preparing the dataset so the library, composer, and manifestation toolkit all point to the same source of truth.

## Tier & Pack Strategy
- **Free:** 15 flagship tones/baths (Solfeggio core, Schumann, one hero bath). Requires email capture for full playback.
- **Weekly Pass ($2.99):** Unlocks the Core Catalog (~350 entries) spanning Solfeggio, planetary, Monroe focus levels, standard baths, and learning protocols.
- **Lifetime ($39.99):** Full catalog (~500+ entries) plus offline cache, custom composer cloud saves, manifestation sync, and beta features.
- **Add-On Packs ($9.99+ each):** Optional specialty bundles that layer education + presets. Examples: `tartaria_resonance`, `remote_viewing_gateway`, `rife_support`, `binaural_lab`. Lifetime members get discounted access but not automatic entitlement so packs maintain standalone value.

## Data Model
1. **`frequency_catalog` (Supabase table + local seed)**
   - `id`, `name`, `hz` (single number or array), `category`, `type` (single|bath|sequence|binaural|isochronic), `tags`, `benefits`, `references`, `tier_access` (`free|weekly|lifetime`), `pack_ids[]`, `duration_seconds`, `waveform`, `notes`.
   - Backed by `data/frequency-catalog.js` for offline builds.
2. **`frequency_packs`**
   - Metadata for every specialty pack (title, subtitle, story hook, price, icon, includes).
3. **`frequency_tiers`**
   - Defines Free / Weekly / Lifetime entitlements, marketing copy, price, Stripe price IDs, and CTA text for buttons.
4. **`email_signups` (new Supabase table)**
   - `email`, `source`, `consent`, `created_at`. Gate free tier playback after 3 previews.

### JS Module Structure
Use a single module that exports three arrays so every surface (library/composer/manifestation) shares the same data.

```js
export const frequencyCatalog = [
   {
      id: 'solfeggio_396',
      name: '396 Hz • Release Fear',
      hz: [396],
      category: 'solfeggio',
      type: 'single',
      tier_access: 'free',
      pack_ids: ['core_foundations'],
      tags: ['grounding', 'root'],
      benefits: ['Eases anxiety', 'Supports root chakra'],
      references: ['Journal of Sound Therapy 2017'],
      duration_seconds: 600,
      waveform: 'sine',
      evidence: 'emerging',
      notes: 'Pairs well with 7.83 Hz Schumann for nightly grounding blocks.'
   }
]

export const frequencyPacks = [
   {
      id: 'remote_viewing_gateway',
      title: 'Remote Viewing Gateway',
      subtitle: 'Monroe protocols for deep psi training',
      price_usd: 9.99,
      includes: ['Focus 10', 'Focus 12', '4 Hz theta drivers', '40 Hz gamma lock'],
      tier_discount: { lifetime: 0.4 },
      story: 'Built from Monroe tapes + DIA declassified notes.'
   }
]

export const frequencyTiers = [
   {
      id: 'free',
      price_usd: 0,
      headline: '15 flagship frequencies',
      perks: ['3 previews before email gate', 'Core Solfeggio starters'],
      stripe_price_id: null
   }
]
```

## Content Tasks
- **Merge Sources:** Combine `data/frequency-presets.js` singles/baths, `js/frequencies.js` database, and the new research drop (Solfeggio, Tesla/Angel, Tartarian, Rife, Remote Viewing, Brainwave entrainment, Monroe focus levels) into the new schema.
- **Tagging:** Flag speculative sets (`tartaria`, `rife`, `remote-viewing`) with `evidence: 'anecdotal' | 'emerging' | 'peer-reviewed'` to drive UI badges.
- **Glossary Blocks:** Generate structured markdown/JSON for 
  - Healing frequency glossary (cards per tone with citations).
  - FAQ (sleep, DNA repair, binaural, remote viewing, etc.).
  - Affiliate disclosure + tuning fork/book callouts for email funnel.
- **Therapy Protocols:** Encode 174→963 aura sweep, binaural combos, Tartarian resonance (110+216+7.83), Remote Viewing Gateway (4 Hz + 40 Hz + 852 Hz), etc., as `bathLayers` that can be surfaced in composer & manifestation tabs.

## Implementation Phases
1. **Schema + Seed (current task)**
   - Create `data/frequency-catalog.js` exporting `frequencyCatalog`, `frequencyPacks`, `frequencyTiers`.
   - Seed with merged entries (existing ~120 + new research-based additions). Keep arrays extensible so we can script the rest.
2. **App Integration**
   - Replace ad-hoc references (`FREQUENCY_PRESETS`, `FREQUENCY_DATABASE`) with the new catalog loader.
   - Provide helper selectors for filtering by tier/pack, retrieving baths, and exposing glossary data to Library + Manifestation.
3. **Payments & Unlocks**
   - Hook Supabase `user_packs` + `user_tier` fields into UI gating. Show lock states + CTA per pack/tier.
   - Connect Stripe price IDs once marketing copy is final.
4. **Content Surfaces**
   - Add glossary accordion + FAQ to Library tab.
   - Surface pack detail modals in composer + manifestation.
   - Inject email capture + affiliate callouts per spec.

Once this foundation is merged we can roll into the beta readiness checklist (CI, packaging, analytics).
