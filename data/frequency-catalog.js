// Unified HealTone frequency catalog - source of truth for tiers, packs, and glossary surfaces.

const frequencyTiers = [
  {
    id: 'free',
    name: 'Free Starter',
    price_usd: 0,
    cta: 'Unlock Free Core',
    perks: ['15 flagship tones', 'Library + Manifest basics', '3 previews before email gate'],
    includes_packs: ['core_foundations'],
    stripe_price_id: null,
    description: 'Ground yourself with Solfeggio anchors, Schumann resonance, and the hero healing bath.'
  },
  {
    id: 'weekly',
    name: 'Weekly Pass',
    price_usd: 4.99,
    cta: 'Start Weekly Pass',
    perks: ['350+ catalog entries', 'Composer cloud saves', 'Supabase manifestation sync'],
    includes_packs: ['core_foundations', 'binaural_lab', 'emotional_reset'],
    stripe_price_id: 'price_1SaZUKIJONruX42X6xjcLcMK',
    description: 'Unlock the Core Catalog for deep work sprints, binaural labs, and full manifestation toolchains.'
  },
  {
    id: 'lifetime',
    name: 'Lifetime Access',
    price_usd: 69.99,
    cta: 'Own Lifetime Access',
    perks: ['500+ entries + offline cache', 'Beta composer features', '40% off specialty packs'],
    includes_packs: ['core_foundations', 'binaural_lab', 'emotional_reset'],
    pack_discounts: { tartaria_resonance: 0.4, remote_viewing_gateway: 0.4, manifestation_magnetics: 0.4 },
    stripe_price_id: 'price_1SaZa2IJONruX42XTjv6rInh',
    description: 'All future updates, manifestation sync, offline cache, and discounted Tartaria/Remote Viewing packs.'
  }
];

const frequencyPacks = [
  {
    id: 'core_foundations',
    title: 'Core Foundations',
    subtitle: 'Solfeggio, Schumann, angelic tunings',
    badge: 'Included',
    price_usd: 0,
    included_in_tiers: ['free', 'weekly', 'lifetime'],
    icon: 'seedling',
    is_add_on: false,
    includes: ['Flagship Solfeggio singles', 'Schumann resonance layers', 'Healing + focus baths'],
    story: 'Starter kit anchored in research-backed frequencies for grounding, detox, and coherence.'
  },
  {
    id: 'binaural_lab',
    title: 'Binaural Lab',
    subtitle: 'Brainwave entrainment stacks',
    badge: 'Weekly+',
    price_usd: 0,
    included_in_tiers: ['weekly', 'lifetime'],
    icon: 'brain',
    is_add_on: false,
    includes: ['Theta creativity bridges', 'SMR focus boosts', 'Gamma bursts for insight'],
    story: 'Pulls from Monroe-style research to accelerate neuroplasticity, recall, and complex reasoning.'
  },
  {
    id: 'emotional_reset',
    title: 'Emotional Reset',
    subtitle: 'Heart coherence therapies',
    badge: 'Weekly+',
    price_usd: 0,
    included_in_tiers: ['weekly', 'lifetime'],
    icon: 'heart',
    is_add_on: false,
    includes: ['Heart-healing baths', 'Anxiety dissolvers', 'Self-love enhancers'],
    story: 'Guided baths for nervous system regulation, pairing 396/639/852 Hz stacks with Schumann support.'
  },
  {
    id: 'remote_viewing_gateway',
    title: 'Remote Viewing Gateway',
    subtitle: 'Monroe + DIA inspired ESP lab',
    badge: 'Add-On',
    price_usd: 9.99,
    included_in_tiers: [],
    icon: 'satellite',
    is_add_on: true,
    includes: ['Astral navigator baths', '4 Hz theta tunnels', '40 Hz gamma locks', 'Pineal activators'],
    story: 'Combines Focus 10/12 protocols, 4 Hz theta, and angelic carriers to rehearse remote sensing stacks.',
    stripe_price_id: 'price_remote_viewing_stub'
  },
  {
    id: 'tartaria_resonance',
    title: 'Tartaria Resonance',
    subtitle: 'Speculative cymatic stacks',
    badge: 'Add-On',
    price_usd: 9.99,
    included_in_tiers: [],
    icon: 'temple',
    is_add_on: true,
    includes: ['Levitation resonance', 'Planetary alignments', '432/528 sacred geometry sweeps'],
    story: 'Anecdotal research on Tartarian resonance tech, blending Schumann carriers with 45 Hz pillars.',
    stripe_price_id: 'price_tartaria_stub'
  },
  {
    id: 'manifestation_magnetics',
    title: 'Manifestation Magnetics',
    subtitle: 'Abundance & quantum creation',
    badge: 'Add-On',
    price_usd: 9.99,
    included_in_tiers: [],
    icon: 'spark',
    is_add_on: true,
    includes: ['Abundance baths', 'Opportunity magnets', '888/963 angel stacks'],
    story: 'Guided manifestation journeys pairing 396→963 sweeps with prosperity harmonics.',
    stripe_price_id: 'price_manifestation_stub'
  },
  {
    id: 'cancer_suite',
    title: 'Cancer Suite',
    subtitle: 'Cellular regeneration protocols',
    badge: 'Premium',
    price_usd: 9.99,
    included_in_tiers: [],
    icon: 'shield',
    is_add_on: true,
    is_premium: true,
    includes: ['Cellular healing frequencies', 'Immune support stacks', 'DNA regeneration protocols', 'Meridian balancing'],
    story: 'Specialized frequency combinations targeting cellular wellness, immune support, and regeneration using research-backed protocols.',
    stripe_price_id: 'price_cancer_suite',
    frequencies: ['heal-528', 'heal-174', 'heal-285', 'heal-396']
  },
  {
    id: 'gateway_project',
    title: 'Gateway Project',
    subtitle: 'Consciousness expansion techniques',
    badge: 'Premium',
    price_usd: 9.99,
    included_in_tiers: [],
    icon: 'compass',
    is_add_on: true,
    is_premium: true,
    includes: ['Focus 10-26 protocols', 'Deep meditation guides', 'Astral projection support', 'Expanded awareness frequencies'],
    story: 'Gateway Experience-inspired frequency journey combining binaural beats, isochronic tones, and specialized frequency progressions for consciousness exploration.',
    stripe_price_id: 'price_gateway_project',
    frequencies: ['binaural-theta', 'binaural-delta', 'freq-40', 'freq-111']
  },
  {
    id: 'remote_viewing_elite',
    title: 'Remote Viewing Elite',
    subtitle: 'Advanced ESP & intuition training',
    badge: 'Premium',
    price_usd: 9.99,
    included_in_tiers: [],
    icon: 'eye',
    is_add_on: true,
    is_premium: true,
    includes: ['RV protocol training baths', 'Pineal gland activators', '40 Hz focus locks', 'Theta-gamma bridging'],
    story: 'Advanced program for developing remote viewing skills combining CIA-style protocols with frequency-based cognitive enhancement.',
    stripe_price_id: 'price_remote_viewing_elite',
    frequencies: ['freq-4', 'freq-40', 'freq-111', 'freq-963']
  }
];

const PACK_BY_CATEGORY = {
  healing: 'core_foundations',
  mental: 'binaural_lab',
  spiritual: 'core_foundations',
  psychic: 'remote_viewing_gateway',
  emotional: 'emotional_reset',
  metaphysical: 'tartaria_resonance',
  manifestation: 'manifestation_magnetics',
  sleep: 'emotional_reset',
  relaxation: 'emotional_reset',
  meditation: 'core_foundations',
  focus: 'binaural_lab',
  energy: 'binaural_lab',
  reference: 'core_foundations'
};

const EVIDENCE_BY_CATEGORY = {
  healing: 'emerging',
  mental: 'research-backed',
  spiritual: 'emerging',
  psychic: 'anecdotal',
  emotional: 'emerging',
  metaphysical: 'anecdotal',
  manifestation: 'anecdotal',
  sleep: 'emerging',
  relaxation: 'emerging',
  meditation: 'emerging',
  focus: 'research-backed',
  energy: 'emerging',
  reference: 'reference'
};

const FREE_IDS = new Set([
  'heal-174',
  'heal-285',
  'heal-528',
  'mental-010',
  'spirit-783',
  'spirit-432',
  'emotional-396',
  'emotional-528',
  'emotional-639',
  'bath-healing-core',
  'bath-focus',
  'bath-anxiety-release',
  'bath-pain-dissolver',
  'bath-brain-fog',
  'bath-awakening-gateway'
]);

const LIFETIME_IDS = new Set([
  'psychic-astral',
  'psychic-pineal',
  'bath-third-eye-ascension',
  'bath-crown-light',
  'bath-astral-navigator',
  'bath-remote-viewing',
  'bath-psychic-amplifier',
  'bath-pineal-light',
  'bath-telekinetic',
  'bath-tartarian-levitation',
  'bath-planetary-alignment',
  'bath-cosmic-power',
  'bath-sacred-geometry',
  'bath-angel-gateway',
  'bath-infinite-prosperity',
  'bath-opportunity-magnet',
  'bath-wealth-alignment',
  'bath-quantum-creation'
]);

const legacySingles = [
  {
    id: 'heal-174',
    name: 'Healing · Pain Relief',
    hz: [174],
    category: 'healing',
    type: 'single',
    waveform: ['sine', 'soft-bell'],
    usage: 'Reduces pain, deep grounding, 5–15 min per session',
    notes: 'Often paired with body scanning or gentle stretches.',
    tags: ['root-chakra', 'anesthetic', 'grounding']
  },
  {
    id: 'heal-285',
    name: 'Healing · Cell Regeneration',
    hz: [285],
    category: 'healing',
    type: 'single',
    waveform: ['sine', 'drone'],
    usage: 'Stimulates tissue repair for 5–10 min; can be played with tuning forks.',
    tags: ['tissue', 'recovery', 'sacral']
  },
  {
    id: 'heal-528',
    name: 'Healing · DNA Repair',
    hz: [528],
    category: 'healing',
    type: 'single',
    waveform: ['sine', 'choir'],
    usage: 'Heart-centered “love frequency” used 15+ min for transformation.',
    tags: ['dna', 'heart', 'love']
  },
  {
    id: 'heal-741',
    name: 'Healing · Detox & Immunity',
    hz: [741],
    category: 'healing',
    type: 'single',
    waveform: ['sine', 'flute'],
    usage: 'Cleanses toxins and boosts immunity; run for 10+ min.',
    tags: ['detox', 'throat', 'clarity']
  },
  {
    id: 'heal-128-110',
    name: 'Healing · Vibrotherapy',
    hz: [128, 110],
    category: 'healing',
    type: 'single',
    waveform: ['tuning-fork', 'low-drone'],
    usage: 'Applied physically for bone/tissue healing and endorphin release.',
    notes: 'Best with weighted tuning forks placed on the body.',
    tags: ['vibroacoustic', 'endorphin', 'grounding']
  },
  {
    id: 'mental-006',
    name: 'Mental · Memory & Neuroplasticity',
    hz: [6],
    category: 'mental',
    type: 'binaural',
    waveform: ['binaural'],
    usage: 'Use with headphones to improve recall and learning (theta).',
    tags: ['memory', 'theta', 'headphones']
  },
  {
    id: 'mental-010',
    name: 'Mental · Clarity & Flow',
    hz: [10],
    category: 'mental',
    type: 'binaural',
    waveform: ['binaural', 'isochronic'],
    usage: 'Calm concentration for study/work blocks.',
    tags: ['alpha', 'focus']
  },
  {
    id: 'mental-014',
    name: 'Mental · Sustained Focus',
    hz: [14],
    category: 'mental',
    type: 'binaural',
    waveform: ['binaural'],
    usage: 'SMR beta entrainment enhances attention, reduces impulsivity.',
    tags: ['beta', 'adhd', 'focus']
  },
  {
    id: 'mental-040',
    name: 'Mental · Reasoning & Gamma Boost',
    hz: [40],
    category: 'mental',
    type: 'binaural',
    waveform: ['binaural', 'pulses'],
    usage: 'Short bursts sharpen logic, symbolic thinking, memory binding.',
    tags: ['gamma', 'problem-solving']
  },
  {
    id: 'spirit-004',
    name: 'Spiritual · Deep Meditation',
    hz: [4],
    category: 'spiritual',
    type: 'binaural',
    waveform: ['binaural'],
    usage: 'Theta trance states for shamanic journeys and OBEs.',
    tags: ['theta', 'astral', 'deep-meditation']
  },
  {
    id: 'spirit-783',
    name: 'Spiritual · Grounding Awareness',
    hz: [7.83],
    category: 'spiritual',
    type: 'binaural',
    waveform: ['binaural'],
    usage: 'Schumann resonance for Earth connection and circadian reset.',
    tags: ['earth', 'grounding', 'schumann']
  },
  {
    id: 'spirit-136',
    name: 'Spiritual · Cosmic OM',
    hz: [136.1],
    category: 'spiritual',
    type: 'single',
    waveform: ['drone', 'instrument'],
    usage: 'Connects to cosmic rhythm, ideal for mantra chanting.',
    tags: ['cosmic-octave', 'om']
  },
  {
    id: 'spirit-432',
    name: 'Spiritual · Natural Harmony',
    hz: [432],
    category: 'spiritual',
    type: 'single',
    waveform: ['music', 'drone'],
    usage: 'Stress relief and enlightenment tuning alternative to 440 Hz.',
    tags: ['calm', 'tartarian', 'harmony']
  },
  {
    id: 'spirit-852',
    name: 'Spiritual · Intuition Gate',
    hz: [852],
    category: 'spiritual',
    type: 'single',
    waveform: ['sine', 'bell'],
    usage: 'Third eye activation for visionary work.',
    tags: ['third-eye', 'solfeggio']
  },
  {
    id: 'spirit-963',
    name: 'Spiritual · Divine Consciousness',
    hz: [963],
    category: 'spiritual',
    type: 'single',
    waveform: ['sine', 'crystal-bowl'],
    usage: 'Crown chakra alignment and source connection.',
    tags: ['crown', 'source']
  },
  {
    id: 'psychic-astral',
    name: 'Psychic · Astral Projection',
    hz: [4, 6],
    category: 'psychic',
    type: 'binaural',
    waveform: ['binaural'],
    usage: 'Theta-delta bridge for OBEs and remote viewing.',
    tags: ['astral', 'theta', 'delta']
  },
  {
    id: 'psychic-pineal',
    name: 'Psychic · Pineal Activation',
    hz: [852, 936],
    category: 'psychic',
    type: 'single',
    waveform: ['sine', 'high-tone'],
    usage: 'ESP enhancement and third-eye clearing.',
    tags: ['pineal', 'intuition']
  },
  {
    id: 'emotional-396',
    name: 'Emotional · Release Fear',
    hz: [396],
    category: 'emotional',
    type: 'single',
    waveform: ['drone', 'low-om'],
    usage: 'Releases guilt and trauma; pair with journaling.',
    tags: ['root', 'release']
  },
  {
    id: 'emotional-432',
    name: 'Emotional · Stress Relief',
    hz: [432],
    category: 'emotional',
    type: 'single',
    waveform: ['music', 'sine'],
    usage: 'Balances nervous system, calms anxiety.',
    tags: ['soothing', 'parasympathetic']
  },
  {
    id: 'emotional-528',
    name: 'Emotional · Love & Joy',
    hz: [528],
    category: 'emotional',
    type: 'single',
    waveform: ['choir'],
    usage: 'Heart opening and positive mood boost.',
    tags: ['heart', 'uplift']
  },
  {
    id: 'emotional-639',
    name: 'Emotional · Heart Coherence',
    hz: [639],
    category: 'emotional',
    type: 'single',
    waveform: ['pad'],
    usage: 'Relationship healing and empathy amplification.',
    tags: ['heart', 'coherence']
  },
  {
    id: 'emotional-741',
    name: 'Emotional · Mental Clarity',
    hz: [741],
    category: 'emotional',
    type: 'single',
    waveform: ['flute'],
    usage: 'Anti-anxiety cleanse to clear looping thoughts.',
    tags: ['clarity', 'throat']
  },
  {
    id: 'emotional-110',
    name: 'Emotional · Deep Calm',
    hz: [110],
    category: 'emotional',
    type: 'single',
    waveform: ['drone'],
    usage: 'Trance-inducing calm and endorphin release.',
    tags: ['gamma-beta-bridge', 'grounding']
  }
];

const legacyBaths = [
  {
    id: 'bath-healing-core',
    name: 'Healing Bath',
    hz: [285, 528, 7.83],
    category: 'healing',
    waveform: ['sine', 'layered'],
    usage: 'Full-body regeneration + grounding for 20–30 min.',
    notes: 'Layer Schumann resonance beneath gentle pads.'
  },
  {
    id: 'bath-focus',
    name: 'Focus Bath',
    hz: [14, 40, 528],
    category: 'mental',
    waveform: ['layered'],
    usage: 'Sharp focus and positive mindset while working.'
  },
  {
    id: 'bath-chakra-alignment',
    name: 'Chakra Alignment Sequence',
    hz: [396, 417, 528, 639, 741, 852, 963],
    category: 'spiritual',
    type: 'sequence',
    usage: '3–7 min per tone to sweep the energy body.'
  },
  {
    id: 'bath-anxiety-release',
    name: 'Anxiety Release Bath',
    hz: [396, 639, 10],
    category: 'emotional',
    waveform: ['layered'],
    usage: 'Grounding and emotional resilience with alpha entrainment.'
  },
  {
    id: 'bath-pain-dissolver',
    name: 'Pain Dissolver Bath',
    hz: [174, 110, 7.83],
    category: 'healing',
    usage: 'Deep relaxation and inflammation reduction.'
  },
  {
    id: 'bath-bone-nerve',
    name: 'Bone & Nerve Regeneration',
    hz: [128, 285, 396],
    category: 'healing',
    usage: 'Supports skeletal and nervous system healing.'
  },
  {
    id: 'bath-rapid-recovery',
    name: 'Rapid Recovery Bath',
    hz: [285, 528, 741],
    category: 'healing',
    usage: 'Speeds cellular repair and detox simultaneously.'
  },
  {
    id: 'bath-immune-booster',
    name: 'Immune Booster Bath',
    hz: [741, 40, 639],
    category: 'healing',
    waveform: ['layered'],
    usage: 'Detox, heart coherence, and gamma pulses for immunity.'
  },
  {
    id: 'bath-vital-energy',
    name: 'Vital Energy Revive',
    hz: [396, 639, 136.1],
    category: 'healing',
    usage: 'Restores life force while stabilizing recovery energy.'
  },
  {
    id: 'bath-neuroplasticity',
    name: 'Neuroplasticity Expansion',
    hz: [6, 40, 10],
    category: 'mental',
    usage: 'Boosts memory, creativity, and neural rewiring.'
  },
  {
    id: 'bath-logic-reasoning',
    name: 'Logic & Reasoning Power',
    hz: [14, 40, 7.83],
    category: 'mental',
    usage: 'Sharpens thinking while keeping you grounded.'
  },
  {
    id: 'bath-deep-study',
    name: 'Deep Study Flow',
    hz: [10, 14, 528],
    category: 'mental',
    usage: 'Clarity + focus + positive emotional tone for studying.'
  },
  {
    id: 'bath-math-insight',
    name: 'Mathematical Insight Bath',
    hz: [40, 852, 14],
    category: 'mental',
    usage: 'Enhances problem-solving and symbolic recognition.'
  },
  {
    id: 'bath-brain-fog',
    name: 'Brain Fog Clearer',
    hz: [7.83, 10, 741],
    category: 'mental',
    usage: 'Sweeps mental fatigue and fog with Earth resonance.'
  },
  {
    id: 'bath-awakening-gateway',
    name: 'Awakening Gateway',
    hz: [4, 963, 136.1],
    category: 'spiritual',
    usage: 'For breakthroughs and cosmic alignment.'
  },
  {
    id: 'bath-kundalini',
    name: 'Kundalini Rising Bath',
    hz: [396, 528, 852],
    category: 'spiritual',
    usage: 'Activates kundalini flow upward safely.'
  },
  {
    id: 'bath-universal-harmony',
    name: 'Universal Harmony Bath',
    hz: [432, 7.83, 963],
    category: 'spiritual',
    usage: 'Aligns the body with universal peace signals.'
  },
  {
    id: 'bath-third-eye-ascension',
    name: 'Third Eye Ascension',
    hz: [852, 936, 40],
    category: 'psychic',
    usage: 'Boosts intuition with gamma bursts.'
  },
  {
    id: 'bath-crown-light',
    name: 'Crown Light Expansion',
    hz: [963, 136.1, 888],
    category: 'spiritual',
    usage: 'Connects divine consciousness with abundance streams.'
  },
  {
    id: 'bath-astral-navigator',
    name: 'Astral Navigator',
    hz: [4, 7.83, 852],
    category: 'psychic',
    usage: 'Ideal for out-of-body exploration.'
  },
  {
    id: 'bath-remote-viewing',
    name: 'Remote Viewing Gateway',
    hz: [6, 8, 852],
    category: 'psychic',
    usage: 'Enhances clairvoyance and distant sensing.'
  },
  {
    id: 'bath-psychic-amplifier',
    name: 'Psychic Amplifier Bath',
    hz: [852, 936, 639],
    category: 'psychic',
    usage: 'Combines intuition with heart coherence for ESP.'
  },
  {
    id: 'bath-pineal-light',
    name: 'Pineal Light Activation',
    hz: [852, 963, 7.83],
    category: 'psychic',
    usage: 'Decalcifies and activates pineal awareness.'
  },
  {
    id: 'bath-telekinetic',
    name: 'Telekinetic Resonance',
    hz: [8, 45, 852],
    category: 'psychic',
    usage: 'Experimental field for energy manipulation.',
    notes: 'Mid layer sweeps between 40–50 Hz pulses. Use caution.'
  },
  {
    id: 'bath-fear-release-cleanse',
    name: 'Fear Release Deep Cleanse',
    hz: [396, 417, 7.83],
    category: 'emotional',
    usage: 'Removes lingering trauma with Earth resonance support.'
  },
  {
    id: 'bath-emotional-reset',
    name: 'Emotional Reset Bath',
    hz: [396, 639, 528],
    category: 'emotional',
    usage: 'Rebalances heart and mind for healing.'
  },
  {
    id: 'bath-anxiety-eraser',
    name: 'Anxiety Eraser',
    hz: [110, 432, 10],
    category: 'emotional',
    usage: 'Calms panic and stabilizes breathing via alpha entrainment.'
  },
  {
    id: 'bath-self-love',
    name: 'Self-Love Enhancement',
    hz: [528, 639, 852],
    category: 'emotional',
    usage: 'Amplifies self-worth and inner joy.'
  },
  {
    id: 'bath-depression-lifter',
    name: 'Depression Lifter Bath',
    hz: [396, 528, 40],
    category: 'emotional',
    usage: 'Energizes mood with gamma uplift.'
  },
  {
    id: 'bath-planetary-alignment',
    name: 'Planetary Alignment Bath',
    hz: [136.1, 210.42, 221.23],
    category: 'metaphysical',
    usage: 'Connects Earth, Moon, and Venus energies.'
  },
  {
    id: 'bath-cosmic-power',
    name: 'Cosmic Power Field',
    hz: [126.22, 144.72, 183.58],
    category: 'metaphysical',
    usage: 'Invokes solar vitality, courage, and abundance.'
  },
  {
    id: 'bath-sacred-geometry',
    name: 'Sacred Geometry Bath',
    hz: [432, 528],
    category: 'metaphysical',
    usage: 'Aligns with universal patterns using Fibonacci pulsing.',
    notes: 'Modulate amplitude following a 1.618 ratio LFO.'
  },
  {
    id: 'bath-tartarian-levitation',
    name: 'Tartarian Levitation Resonance',
    hz: [7.83, 45, 852],
    category: 'metaphysical',
    usage: 'Inspired by speculative Tartarian resonance tech.',
    notes: 'Blend Schumann grounding, standing-wave mid band, and angelic overtones.'
  },
  {
    id: 'bath-angel-gateway',
    name: 'Angel Gateway Bath',
    hz: [111, 333, 639],
    category: 'metaphysical',
    usage: 'Invites divine presence, healing, and guidance.'
  },
  {
    id: 'bath-abundance-flow',
    name: 'Abundance Flow',
    hz: [396, 528, 888],
    category: 'manifestation',
    usage: 'Clears scarcity, charges intentions with love, amplifies abundance.',
    notes: 'Optional 8 Hz theta underlay for subconscious priming.'
  },
  {
    id: 'bath-opportunity-magnet',
    name: 'Opportunity Magnet',
    hz: [7.83, 639, 222],
    category: 'manifestation',
    usage: 'Grounds, opens the heart, and aligns partnership energy.'
  },
  {
    id: 'bath-infinite-prosperity',
    name: 'Infinite Prosperity Gateway',
    hz: [111, 528, 888, 963],
    category: 'manifestation',
    usage: 'Divine inspiration → love → abundance → unity field.'
  },
  {
    id: 'bath-wealth-alignment',
    name: 'Wealth Alignment Sequence',
    hz: [396, 528, 639, 888],
    category: 'manifestation',
    type: 'sequence',
    usage: 'Play ascending; focus intention at each step.'
  },
  {
    id: 'bath-quantum-creation',
    name: 'Quantum Creation Bath',
    hz: [8, 432, 999],
    category: 'manifestation',
    usage: 'Theta creation space sealed with universal harmony + completion.'
  }
];

const supplementalDatabase = {
  // SOLFEGGIO FREQUENCIES (Core 9)
  solfeggio: [
    {
      id: 'sol-174',
      name: 'Natural Anesthetic',
      hz: 174,
      category: 'healing',
      description: 'Foundation of conscious evolution, pain relief',
      benefits: ['Reduces physical pain', 'Deep grounding', 'Security'],
      duration: 300,
      waveform: 'sine',
      color: '#8B4513'
    },
    {
      id: 'sol-285',
      name: 'Quantum Cognition',
      hz: 285,
      category: 'healing',
      description: 'Influences energy fields, cellular healing',
      benefits: ['Tissue regeneration', 'Quantum healing', 'Cellular repair'],
      duration: 420,
      waveform: 'sine',
      color: '#FF6B6B'
    },
    {
      id: 'sol-396',
      name: 'Liberation',
      hz: 396,
      category: 'emotional',
      description: 'Liberation from guilt and fear',
      benefits: ['Releases guilt', 'Dissolves fear', 'Root chakra activation'],
      duration: 480,
      waveform: 'sine',
      color: '#FF0000'
    },
    {
      id: 'sol-417',
      name: 'Transmutation',
      hz: 417,
      category: 'emotional',
      description: 'Facilitates change and removes negative energy',
      benefits: ['Clears negativity', 'Enables change', 'Sacral chakra'],
      duration: 480,
      waveform: 'sine',
      color: '#FF7F00'
    },
    {
      id: 'sol-528',
      name: 'Miracle Tone',
      hz: 528,
      category: 'healing',
      description: 'DNA repair, transformation, miracles',
      benefits: ['DNA repair', 'Love frequency', 'Miracles & transformation'],
      duration: 600,
      waveform: 'sine',
      color: '#FFD700'
    },
    {
      id: 'sol-639',
      name: 'Heart Connection',
      hz: 639,
      category: 'spiritual',
      description: 'Relationships, understanding, tolerance',
      benefits: ['Heart chakra', 'Enhances relationships', 'Communication'],
      duration: 480,
      waveform: 'sine',
      color: '#00FF00'
    },
    {
      id: 'sol-741',
      name: 'Awakening Intuition',
      hz: 741,
      category: 'spiritual',
      description: 'Expression, solutions, purification',
      benefits: ['Throat chakra', 'Self-expression', 'Detoxification'],
      duration: 420,
      waveform: 'sine',
      color: '#0000FF'
    },
    {
      id: 'sol-852',
      name: 'Returning to Spirit',
      hz: 852,
      category: 'spiritual',
      description: 'Third eye activation, spiritual order',
      benefits: ['Third eye chakra', 'Intuition', 'Spiritual awakening'],
      duration: 420,
      waveform: 'sine',
      color: '#4B0082'
    },
    {
      id: 'sol-963',
      name: 'Divine Consciousness',
      hz: 963,
      category: 'spiritual',
      description: 'Oneness, connection with universe',
      benefits: ['Crown chakra', 'Divine connection', 'Enlightenment'],
      duration: 540,
      waveform: 'sine',
      color: '#9400D3'
    }
  ],

  // BRAINWAVE FREQUENCIES
  brainwaves: [
    {
      id: 'delta-05',
      name: 'Deep Sleep Delta',
      hz: 0.5,
      category: 'sleep',
      description: 'Deepest sleep, unconscious mind',
      benefits: ['Deep sleep', 'Healing', 'Regeneration'],
      duration: 1800,
      waveform: 'sine',
      color: '#000080'
    },
    {
      id: 'delta-1',
      name: 'Delta Wave',
      hz: 1,
      category: 'sleep',
      description: 'Deep dreamless sleep',
      benefits: ['Physical recovery', 'Immune boost', 'Deep rest'],
      duration: 1800,
      waveform: 'sine',
      color: '#191970'
    },
    {
      id: 'delta-2',
      name: 'Delta High',
      hz: 2,
      category: 'sleep',
      description: 'Healing sleep state',
      benefits: ['Cell repair', 'Growth hormone', 'Recovery'],
      duration: 1800,
      waveform: 'sine',
      color: '#000099'
    },
    {
      id: 'delta-3',
      name: 'Delta Peak',
      hz: 3,
      category: 'sleep',
      description: 'Deep meditation border',
      benefits: ['Deep trance', 'Subconscious access', 'Healing'],
      duration: 1200,
      waveform: 'sine',
      color: '#0000CD'
    },
    {
      id: 'theta-4',
      name: 'Theta Gateway',
      hz: 4,
      category: 'meditation',
      description: 'Deep meditation, astral projection',
      benefits: ['Astral travel', 'Deep meditation', 'Intuition'],
      duration: 1200,
      waveform: 'sine',
      color: '#4169E1'
    },
    {
      id: 'theta-5',
      name: 'Theta Mid',
      hz: 5,
      category: 'meditation',
      description: 'Creativity, learning',
      benefits: ['Enhanced learning', 'Creativity', 'Memory'],
      duration: 900,
      waveform: 'sine',
      color: '#1E90FF'
    },
    {
      id: 'theta-6',
      name: 'Theta High',
      hz: 6,
      category: 'meditation',
      description: 'Vivid imagery, deep meditation',
      benefits: ['Visualization', 'Hypnosis', 'Memory'],
      duration: 900,
      waveform: 'sine',
      color: '#00BFFF'
    },
    {
      id: 'theta-7',
      name: 'Theta Peak',
      hz: 7,
      category: 'meditation',
      description: 'Emotional healing, creativity',
      benefits: ['Emotional release', 'Creativity', 'Spirituality'],
      duration: 900,
      waveform: 'sine',
      color: '#87CEEB'
    },
    {
      id: 'schumann',
      name: 'Schumann Resonance',
      hz: 7.83,
      category: 'healing',
      description: "Earth's electromagnetic frequency",
      benefits: ['Grounding', 'Earth connection', 'Balance'],
      duration: 1200,
      waveform: 'sine',
      color: '#8B4513'
    },
    {
      id: 'alpha-8',
      name: 'Alpha Low',
      hz: 8,
      category: 'relaxation',
      description: 'Relaxation, light meditation',
      benefits: ['Stress relief', 'Relaxation', 'Meditation'],
      duration: 600,
      waveform: 'sine',
      color: '#00CED1'
    },
    {
      id: 'alpha-10',
      name: 'Alpha Mid',
      hz: 10,
      category: 'focus',
      description: 'Relaxed focus, clarity',
      benefits: ['Calm focus', 'Learning', 'Relaxation'],
      duration: 600,
      waveform: 'sine',
      color: '#20B2AA'
    },
    {
      id: 'alpha-12',
      name: 'Alpha High',
      hz: 12,
      category: 'focus',
      description: 'Aware relaxation',
      benefits: ['Mental clarity', 'Alertness', 'Calm awareness'],
      duration: 600,
      waveform: 'sine',
      color: '#48D1CC'
    },
    {
      id: 'smr-13',
      name: 'SMR Low',
      hz: 13,
      category: 'focus',
      description: 'Sensory motor rhythm',
      benefits: ['Motor control', 'Calm alertness', 'Focus'],
      duration: 600,
      waveform: 'sine',
      color: '#40E0D0'
    },
    {
      id: 'smr-14',
      name: 'SMR Peak',
      hz: 14,
      category: 'focus',
      description: 'Peak attention, learning',
      benefits: ['Sustained attention', 'Reduces impulsivity', 'Learning'],
      duration: 600,
      waveform: 'sine',
      color: '#00FFFF'
    },
    {
      id: 'beta-15',
      name: 'Beta Low',
      hz: 15,
      category: 'focus',
      description: 'Active thinking',
      benefits: ['Active focus', 'Problem solving', 'Alertness'],
      duration: 600,
      waveform: 'sine',
      color: '#7FFFD4'
    },
    {
      id: 'beta-20',
      name: 'Beta Mid',
      hz: 20,
      category: 'focus',
      description: 'Normal waking consciousness',
      benefits: ['Active thinking', 'Concentration', 'Energy'],
      duration: 600,
      waveform: 'sine',
      color: '#66CDAA'
    },
    {
      id: 'beta-30',
      name: 'Beta High',
      hz: 30,
      category: 'energy',
      description: 'High alert, complex tasks',
      benefits: ['Peak performance', 'Complex thinking', 'Energy'],
      duration: 300,
      waveform: 'sine',
      color: '#90EE90'
    },
    {
      id: 'gamma-40',
      name: 'Gamma Entry',
      hz: 40,
      category: 'focus',
      description: 'High cognition, peak awareness',
      benefits: ['Memory', 'Information processing', 'Cognition'],
      duration: 300,
      waveform: 'sine',
      color: '#ADFF2F'
    },
    {
      id: 'gamma-70',
      name: 'Gamma Peak',
      hz: 70,
      category: 'focus',
      description: 'Maximum cognitive processing',
      benefits: ['Peak cognition', 'Integration', 'Consciousness'],
      duration: 180,
      waveform: 'sine',
      color: '#7FFF00'
    }
  ],

  // HEALING FREQUENCIES
  healing: [
    {
      id: 'heal-110',
      name: 'Cell Rejuvenation',
      hz: 110,
      category: 'healing',
      description: 'Cellular regeneration',
      benefits: ['Cell repair', 'Anti-aging', 'Vitality'],
      duration: 600,
      waveform: 'sine',
      color: '#FF69B4'
    },
    {
      id: 'heal-128',
      name: 'Bone Healing',
      hz: 128,
      category: 'healing',
      description: 'Bone and tissue repair',
      benefits: ['Bone density', 'Tissue repair', 'Structural healing'],
      duration: 600,
      waveform: 'sine',
      color: '#FFA07A'
    },
    {
      id: 'heal-256',
      name: 'Root Chakra Healing',
      hz: 256,
      category: 'healing',
      description: 'Root chakra frequency',
      benefits: ['Grounding', 'Security', 'Survival'],
      duration: 480,
      waveform: 'sine',
      color: '#FF0000'
    },
    {
      id: 'heal-272',
      name: 'Sacral Chakra',
      hz: 272,
      category: 'healing',
      description: 'Sacral chakra activation',
      benefits: ['Creativity', 'Sexuality', 'Pleasure'],
      duration: 480,
      waveform: 'sine',
      color: '#FF7F00'
    },
    {
      id: 'heal-320',
      name: 'Solar Plexus',
      hz: 320,
      category: 'healing',
      description: 'Personal power center',
      benefits: ['Confidence', 'Willpower', 'Digestion'],
      duration: 480,
      waveform: 'sine',
      color: '#FFFF00'
    },
    {
      id: 'heal-341',
      name: 'Heart Chakra',
      hz: 341.3,
      category: 'healing',
      description: 'Heart center healing',
      benefits: ['Love', 'Compassion', 'Emotional balance'],
      duration: 600,
      waveform: 'sine',
      color: '#00FF00'
    },
    {
      id: 'heal-384',
      name: 'Throat Chakra',
      hz: 384,
      category: 'healing',
      description: 'Communication center',
      benefits: ['Expression', 'Truth', 'Communication'],
      duration: 480,
      waveform: 'sine',
      color: '#87CEEB'
    },
    {
      id: 'heal-426',
      name: 'Third Eye Chakra',
      hz: 426.7,
      category: 'spiritual',
      description: 'Intuition and insight',
      benefits: ['Intuition', 'Clarity', 'Vision'],
      duration: 600,
      waveform: 'sine',
      color: '#4B0082'
    },
    {
      id: 'heal-480',
      name: 'Crown Chakra',
      hz: 480,
      category: 'spiritual',
      description: 'Spiritual connection',
      benefits: ['Enlightenment', 'Unity', 'Consciousness'],
      duration: 600,
      waveform: 'sine',
      color: '#9400D3'
    }
  ],

  // PLANETARY FREQUENCIES (Cosmic Octave)
  planetary: [
    {
      id: 'planet-sun',
      name: 'Sun - Life Force',
      hz: 126.22,
      category: 'metaphysical',
      description: 'Solar energy, vitality',
      benefits: ['Vitality', 'Life force', 'Yang energy'],
      duration: 600,
      waveform: 'sine',
      color: '#FFD700'
    },
    {
      id: 'planet-earth',
      name: 'Earth Year (OM)',
      hz: 136.10,
      category: 'metaphysical',
      description: 'Universal OM frequency',
      benefits: ['Grounding', 'Cosmic connection', 'Balance'],
      duration: 900,
      waveform: 'sine',
      color: '#8B4513'
    },
    {
      id: 'planet-moon',
      name: 'Moon - Feminine',
      hz: 210.42,
      category: 'metaphysical',
      description: 'Lunar energy, intuition',
      benefits: ['Intuition', 'Feminine energy', 'Cycles'],
      duration: 600,
      waveform: 'sine',
      color: '#C0C0C0'
    },
    {
      id: 'planet-mercury',
      name: 'Mercury - Communication',
      hz: 141.27,
      category: 'metaphysical',
      description: 'Mental clarity, communication',
      benefits: ['Communication', 'Intelligence', 'Learning'],
      duration: 480,
      waveform: 'sine',
      color: '#87CEEB'
    },
    {
      id: 'planet-venus',
      name: 'Venus - Love & Beauty',
      hz: 221.23,
      category: 'metaphysical',
      description: 'Love, beauty, harmony',
      benefits: ['Love', 'Beauty', 'Harmony'],
      duration: 600,
      waveform: 'sine',
      color: '#FF69B4'
    },
    {
      id: 'planet-mars',
      name: 'Mars - Strength',
      hz: 144.72,
      category: 'metaphysical',
      description: 'Courage, strength, action',
      benefits: ['Courage', 'Strength', 'Willpower'],
      duration: 480,
      waveform: 'sine',
      color: '#DC143C'
    },
    {
      id: 'planet-jupiter',
      name: 'Jupiter - Expansion',
      hz: 183.58,
      category: 'metaphysical',
      description: 'Growth, abundance, wisdom',
      benefits: ['Abundance', 'Growth', 'Wisdom'],
      duration: 600,
      waveform: 'sine',
      color: '#FFA500'
    },
    {
      id: 'planet-saturn',
      name: 'Saturn - Structure',
      hz: 147.85,
      category: 'metaphysical',
      description: 'Discipline, boundaries, karma',
      benefits: ['Discipline', 'Structure', 'Karma'],
      duration: 600,
      waveform: 'sine',
      color: '#8B7355'
    },
    {
      id: 'planet-uranus',
      name: 'Uranus - Awakening',
      hz: 207.36,
      category: 'metaphysical',
      description: 'Innovation, awakening, change',
      benefits: ['Innovation', 'Awakening', 'Transformation'],
      duration: 600,
      waveform: 'sine',
      color: '#40E0D0'
    },
    {
      id: 'planet-neptune',
      name: 'Neptune - Transcendence',
      hz: 211.44,
      category: 'metaphysical',
      description: 'Spirituality, dreams, transcendence',
      benefits: ['Spirituality', 'Dreams', 'Mystic visions'],
      duration: 720,
      waveform: 'sine',
      color: '#4169E1'
    },
    {
      id: 'planet-pluto',
      name: 'Pluto - Transformation',
      hz: 140.25,
      category: 'metaphysical',
      description: 'Death, rebirth, transformation',
      benefits: ['Transformation', 'Rebirth', 'Power'],
      duration: 600,
      waveform: 'sine',
      color: '#8B0000'
    }
  ],

  // SPECIAL PURPOSE FREQUENCIES
  special: [
    {
      id: 'special-432',
      name: 'Natural Harmony',
      hz: 432,
      category: 'spiritual',
      description: 'Universal healing vibration',
      benefits: ['Universal harmony', 'Natural tuning', 'Stress relief'],
      duration: 900,
      waveform: 'sine',
      color: '#FFD700'
    },
    {
      id: 'special-440',
      name: 'Standard Tuning',
      hz: 440,
      category: 'reference',
      description: 'Modern concert pitch A',
      benefits: ['Reference tone', 'Standard pitch', 'Tuning'],
      duration: 300,
      waveform: 'sine',
      color: '#FFFFFF'
    },
    {
      id: 'special-888',
      name: 'Abundance Frequency',
      hz: 888,
      category: 'manifestation',
      description: 'Wealth and prosperity',
      benefits: ['Abundance', 'Prosperity', 'Manifestation'],
      duration: 600,
      waveform: 'sine',
      color: '#FFD700'
    },
    {
      id: 'special-999',
      name: 'Completion',
      hz: 999,
      category: 'spiritual',
      description: 'Ending and new beginnings',
      benefits: ['Completion', 'Closure', 'New cycles'],
      duration: 480,
      waveform: 'sine',
      color: '#9400D3'
    },
    {
      id: 'special-1111',
      name: 'Angel Number',
      hz: 1111,
      category: 'spiritual',
      description: 'Spiritual awakening, angel guidance',
      benefits: ['Awakening', 'Angel connection', 'Manifestation'],
      duration: 540,
      waveform: 'sine',
      color: '#FFFFFF'
    }
  ],

  // PAIN & PHYSICAL RELIEF
  pain: [
    {
      id: 'pain-304',
      name: 'General Pain Relief',
      hz: 304,
      category: 'healing',
      description: 'Reduces inflammation and pain',
      benefits: ['Pain reduction', 'Anti-inflammatory', 'Relief'],
      duration: 480,
      waveform: 'sine',
      color: '#FF6B6B'
    },
    {
      id: 'pain-120',
      name: 'Headache Relief',
      hz: 120,
      category: 'healing',
      description: 'Migraine and headache relief',
      benefits: ['Headache relief', 'Migraine', 'Tension release'],
      duration: 360,
      waveform: 'sine',
      color: '#FFA07A'
    },
    {
      id: 'pain-465',
      name: 'Back Pain',
      hz: 465,
      category: 'healing',
      description: 'Lower and upper back pain',
      benefits: ['Back pain', 'Spinal alignment', 'Muscle relaxation'],
      duration: 600,
      waveform: 'sine',
      color: '#FFB6C1'
    },
    {
      id: 'pain-522',
      name: 'Joint Pain',
      hz: 522,
      category: 'healing',
      description: 'Arthritis and joint inflammation',
      benefits: ['Joint pain', 'Arthritis', 'Inflammation'],
      duration: 600,
      waveform: 'sine',
      color: '#DDA0DD'
    }
  ],

  // SLEEP & RELAXATION
  sleep: [
    {
      id: 'sleep-111',
      name: 'Deep Sleep Inducer',
      hz: 111,
      category: 'sleep',
      description: 'Beta-endorphin release for deep sleep',
      benefits: ['Deep sleep', 'Endorphin release', 'Relaxation'],
      duration: 1800,
      waveform: 'sine',
      color: '#191970'
    },
    {
      id: 'sleep-222',
      name: 'REM Sleep',
      hz: 222,
      category: 'sleep',
      description: 'Promotes REM sleep cycles',
      benefits: ['REM sleep', 'Dreaming', 'Memory'],
      duration: 1800,
      waveform: 'sine',
      color: '#483D8B'
    },
    {
      id: 'sleep-444',
      name: 'Restorative Sleep',
      hz: 444,
      category: 'sleep',
      description: 'Full body restoration during sleep',
      benefits: ['Restoration', 'Healing sleep', 'Recovery'],
      duration: 2400,
      waveform: 'sine',
      color: '#6A5ACD'
    }
  ],

  // EMOTIONAL HEALING
  emotional: [
    {
      id: 'emotion-288',
      name: 'Forgiveness',
      hz: 288,
      category: 'emotional',
      description: 'Releasing resentment and grudges',
      benefits: ['Forgiveness', 'Release', 'Emotional freedom'],
      duration: 600,
      waveform: 'sine',
      color: '#FFB6C1'
    },
    {
      id: 'emotion-333',
      name: 'Self Love',
      hz: 333,
      category: 'emotional',
      description: 'Unconditional self acceptance',
      benefits: ['Self love', 'Acceptance', 'Inner peace'],
      duration: 600,
      waveform: 'sine',
      color: '#FF69B4'
    },
    {
      id: 'emotion-555',
      name: 'Inner Peace',
      hz: 555,
      category: 'emotional',
      description: 'Deep emotional calm',
      benefits: ['Peace', 'Calm', 'Serenity'],
      duration: 720,
      waveform: 'sine',
      color: '#87CEEB'
    },
    {
      id: 'emotion-777',
      name: 'Divine Guidance',
      hz: 777,
      category: 'spiritual',
      description: 'Spiritual guidance and protection',
      benefits: ['Guidance', 'Protection', 'Wisdom'],
      duration: 600,
      waveform: 'sine',
      color: '#DDA0DD'
    }
  ],

  // MANIFESTATION FREQUENCIES
  manifestation: [
    {
      id: 'manifest-369',
      name: "Tesla's Code",
      hz: 369,
      category: 'manifestation',
      description: 'Universal creative power',
      benefits: ['Manifestation', 'Creation', 'Abundance'],
      duration: 600,
      waveform: 'sine',
      color: '#FFD700'
    },
    {
      id: 'manifest-666',
      name: 'Material World',
      hz: 666,
      category: 'manifestation',
      description: 'Physical manifestation',
      benefits: ['Material success', 'Physical results', 'Grounding'],
      duration: 480,
      waveform: 'sine',
      color: '#FF6347'
    }
  ]
};

const formatTag = (tag) =>
  tag
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const toArray = (value) => {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

const normalizeEntry = (entry, fallbackType, options = {}) => {
  if (!entry) {
    return null;
  }
  const hzList = Array.isArray(entry.hz) ? entry.hz : [entry.hz].filter((value) => typeof value === 'number');
  const derivedType = fallbackType || (hzList.length > 1 ? 'bath' : 'single');
  const type = entry.type || derivedType;
  const entryCategories = toArray(entry.categories);
  const optionCategories = toArray(options.categories);
  const categoryCandidates = [entry.category, options.category, ...entryCategories, ...optionCategories].filter(Boolean);
  const categories = Array.from(new Set(categoryCandidates.length ? categoryCandidates : ['healing']));
  const category = categories[0];
  const tier = FREE_IDS.has(entry.id)
    ? 'free'
    : LIFETIME_IDS.has(entry.id)
    ? 'lifetime'
    : 'weekly';

  const packCandidates = new Set();
  const mappedPack = PACK_BY_CATEGORY[category];
  if (mappedPack) {
    packCandidates.add(mappedPack);
  }
  if (entry.pack_ids) {
    entry.pack_ids.forEach((pid) => packCandidates.add(pid));
  }
  if (!packCandidates.size) {
    packCandidates.add('core_foundations');
  }

  const waveform = (() => {
    if (!entry.waveform) {
      return type === 'single' ? ['sine'] : ['layered'];
    }
    return Array.isArray(entry.waveform) ? entry.waveform : [entry.waveform];
  })();

  const tagPool = [
    ...toArray(entry.tags),
    ...toArray(entry.tag),
    ...toArray(options.tags),
    ...toArray(options.tag)
  ]
    .filter(Boolean)
    .map((tag) => String(tag).trim())
    .filter(Boolean);

  const benefitPool = toArray(entry.benefits)
    .filter(Boolean)
    .map((benefit) => String(benefit).trim())
    .filter(Boolean);

  const benefits = benefitPool.length
    ? benefitPool
    : tagPool.length
    ? tagPool.map((tag) => formatTag(tag).replace('Chakra', 'Chakra Balance'))
    : [];

  const tags = Array.from(new Set([...tagPool, ...benefits]));

  const mergedMetadata = {
    ...(entry.metadata || {}),
    ...(options.metadata || {})
  };
  const metadata = Object.keys(mergedMetadata).length ? mergedMetadata : null;

  return {
    id: entry.id,
    name: entry.name,
    hz: hzList,
    category,
    categories,
    type,
    tier_access: tier,
    pack_ids: Array.from(packCandidates),
    tags,
    benefits,
    usage: entry.usage || null,
    notes: entry.notes || null,
    waveform,
    duration_seconds: entry.duration_seconds || entry.duration || (type === 'single' ? 600 : 1200),
    evidence: entry.evidence || EVIDENCE_BY_CATEGORY[category] || 'anecdotal',
    references: entry.references || [],
    metadata,
    legacy_source: options.source || 'frequency-presets'
  };
};

const supplementalEntries = Object.entries(supplementalDatabase).flatMap(([collection, entries]) =>
  entries.map((entry) =>
    normalizeEntry(
      {
        id: entry.id,
        name: entry.name,
        hz: entry.hz,
        category: entry.category,
        type: 'single',
        waveform: entry.waveform,
        tags: entry.benefits,
        benefits: entry.benefits,
        usage: entry.description,
        duration_seconds: entry.duration,
        metadata: entry.color
          ? {
              color: entry.color
            }
          : null
      },
      'single',
      {
        categories: [collection],
        tags: [collection],
        metadata: {
          legacyCollection: collection
        },
        source: 'frequency-database'
      }
    )
  )
).filter(Boolean);

const frequencyCatalog = [
  ...legacySingles.map((entry) => normalizeEntry(entry, 'single')),
  ...legacyBaths.map((entry) => normalizeEntry(entry, 'bath')),
  ...supplementalEntries
].filter(Boolean);

const catalogIndex = new Map();
const packIndex = new Map();
const tierIndex = new Map();

const hydrateIndexes = () => {
  catalogIndex.clear();
  packIndex.clear();
  tierIndex.clear();

  frequencyCatalog.forEach((entry) => catalogIndex.set(entry.id, entry));
  frequencyPacks.forEach((pack) => packIndex.set(pack.id, pack));
  frequencyTiers.forEach((tier) => tierIndex.set(tier.id, tier));
};

hydrateIndexes();

const getFrequency = (id) => catalogIndex.get(id) || null;
const getFrequenciesByTier = (tierId) => frequencyCatalog.filter((entry) => entry.tier_access === tierId);
const getFrequenciesByPack = (packId) => frequencyCatalog.filter((entry) => entry.pack_ids?.includes(packId));
const searchCatalog = (query) => {
  if (!query) return frequencyCatalog;
  const lower = query.toLowerCase();
  return frequencyCatalog.filter((entry) => {
    const haystack = [
      entry.name,
      entry.category,
      entry.type,
      ...(entry.tags || []),
      ...(entry.benefits || []),
      entry.notes || ''
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(lower);
  });
};

const getPack = (id) => packIndex.get(id) || null;
const listPacks = () => frequencyPacks;
const getTier = (id) => tierIndex.get(id) || null;
const listTiers = () => frequencyTiers;

const HealToneCatalog = {
  frequencyCatalog,
  frequencyPacks,
  frequencyTiers,
  getFrequency,
  getFrequenciesByTier,
  getFrequenciesByPack,
  searchCatalog,
  getPack,
  listPacks,
  getTier,
  listTiers
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HealToneCatalog;
}

if (typeof window !== 'undefined') {
  window.HealToneCatalog = HealToneCatalog;
}
