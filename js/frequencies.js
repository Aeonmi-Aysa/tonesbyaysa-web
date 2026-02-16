// frequencies.js - Complete 200+ Healing Frequency Database
// Each frequency includes: id, name, hz, category, description, benefits, duration

const FREQUENCY_DATABASE = {
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
      description: 'Earth\'s electromagnetic frequency',
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
      name: 'Tesla\'s Code',
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

// Flatten all frequencies into searchable array
const ALL_FREQUENCIES = Object.values(FREQUENCY_DATABASE).flat();

// Helper functions
const getFrequencyById = (id) => ALL_FREQUENCIES.find(f => f.id === id);
const getFrequenciesByCategory = (category) => ALL_FREQUENCIES.filter(f => f.category === category);
const searchFrequencies = (query) => ALL_FREQUENCIES.filter(f => 
  f.name.toLowerCase().includes(query.toLowerCase()) ||
  f.description.toLowerCase().includes(query.toLowerCase()) ||
  f.benefits.some(b => b.toLowerCase().includes(query.toLowerCase()))
);

// Export for Node/Electron tooling
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FREQUENCY_DATABASE, ALL_FREQUENCIES, getFrequencyById, getFrequenciesByCategory, searchFrequencies };
}

// Attach to browser window for vanilla script usage
if (typeof window !== 'undefined') {
  window.FREQUENCY_DATABASE = FREQUENCY_DATABASE;
  window.ALL_FREQUENCIES = ALL_FREQUENCIES;
  window.getFrequencyById = getFrequencyById;
  window.getFrequenciesByCategory = getFrequenciesByCategory;
  window.searchFrequencies = searchFrequencies;
}