// Curated frequency & bath metadata derived from research notes and legacy app content.
// Shared across Library, Manifestation Toolkit, and Composer workspaces.

const FREQUENCY_PRESETS = {
  singles: [
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
  ],
  baths: [
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
  ],
  brainwaveBands: [
    { id: 'delta', range: '0.5–4 Hz', benefits: 'Deep sleep, healing, immune boost', applications: 'Insomnia therapy, recovery' },
    { id: 'theta', range: '4–8 Hz', benefits: 'Meditation, creativity, anxiety reduction', applications: 'Lucid dreaming, visualization' },
    { id: 'alpha', range: '8–12 Hz', benefits: 'Relaxation, focus, positivity', applications: 'Stress relief, study' },
    { id: 'beta', range: '12–30 Hz', benefits: 'Alertness, problem-solving', applications: 'Productivity, cognitive tasks' },
    { id: 'gamma', range: '30–100 Hz', benefits: 'Peak cognition, insight', applications: 'Meditation enhancement, learning' }
  ],
  angelFrequencies: [
    { hz: 111, theme: 'New beginnings, cellular healing' },
    { hz: 222, theme: 'Harmony, concentration' },
    { hz: 333, theme: 'Intuition, joy, guidance' },
    { hz: 444, theme: 'Protection, guardian connection' },
    { hz: 555, theme: 'Transformation, change' },
    { hz: 666, theme: 'Integration, embodiment' },
    { hz: 777, theme: 'Divine alignment' },
    { hz: 888, theme: 'Prosperity, abundance' },
    { hz: 999, theme: 'Fulfillment, completion' }
  ],
  planetaryFrequencies: [
    { body: 'Sun', hz: 126.22, benefits: 'Vitality, stability' },
    { body: 'Earth Day', hz: 194.18, benefits: 'Grounding, clarity, sleep' },
    { body: 'Earth Orbit (Schumann)', hz: 7.83, benefits: 'Balance, stress tolerance' },
    { body: 'Moon', hz: 210.42, benefits: 'Emotions, intuition' },
    { body: 'Mercury', hz: 141.27, benefits: 'Intellect, communication' },
    { body: 'Venus', hz: 221.23, benefits: 'Love, harmony' },
    { body: 'Mars', hz: 144.72, benefits: 'Energy, motivation' },
    { body: 'Jupiter', hz: 183.58, benefits: 'Expansion, abundance' },
    { body: 'Saturn', hz: 147.85, benefits: 'Structure, discipline' },
    { body: 'Uranus', hz: 207.36, benefits: 'Innovation, change' },
    { body: 'Neptune', hz: 211.44, benefits: 'Dreams, creativity' },
    { body: 'Pluto', hz: 140.25, benefits: 'Transformation, growth' }
  ]
};

if (typeof window !== 'undefined') {
  window.FREQUENCY_PRESETS = FREQUENCY_PRESETS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FREQUENCY_PRESETS;
}
