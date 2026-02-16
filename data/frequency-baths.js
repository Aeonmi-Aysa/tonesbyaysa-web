// FREQUENCY_BATHS.js - Multi-frequency healing baths library
// 20+ curated combinations for holistic wellness

const FREQUENCY_BATHS = {
  // Bath interface definition
  interface: {
    id: 'string (unique identifier)',
    name: 'string (display name)',
    frequencies: 'number[] (array of Hz values to layer)',
    category: 'string (wellness type)',
    description: 'string (what it does)',
    benefits: 'string[] (array of benefits)',
    usage: 'string (how to use)',
    duration: 'number (recommended duration in seconds)',
    isPremium: 'boolean (requires subscription)'
  },

  categories: ['healing', 'mental', 'spiritual', 'emotional', 'psychic', 'manifestation', 'sleep'],

  // WELLNESS BATHS (5)
  wellness: [
    {
      id: 'bath-core-wellness',
      name: 'Core Wellness Bath',
      frequencies: [285, 528, 7.83],
      category: 'healing',
      description: 'Full-body balance with Schumann grounding',
      benefits: ['Cellular harmony', 'DNA balance', 'Earth grounding'],
      usage: 'Full-body balance + grounding for 20–30 min',
      duration: 1800,
      isPremium: false
    },
    {
      id: 'bath-comfort-support',
      name: 'Comfort Support Bath',
      frequencies: [174, 110, 7.83],
      category: 'healing',
      description: 'Deep relaxation and tension release',
      benefits: ['Deep comfort', 'Tension release', 'Grounding'],
      usage: 'Deep relaxation and tension release',
      duration: 1200,
      isPremium: false
    },
    {
      id: 'bath-bone-nerve',
      name: 'Bone & Nerve Support',
      frequencies: [128, 285, 396],
      category: 'healing',
      description: 'Supports skeletal and nervous system wellness',
      benefits: ['Bone strength', 'Nerve support', 'Tissue harmony'],
      usage: 'Supports skeletal and nervous system wellness',
      duration: 1200,
      isPremium: true
    },
    {
      id: 'bath-deep-restoration',
      name: 'Deep Restoration Bath',
      frequencies: [285, 528, 741],
      category: 'healing',
      description: 'Supports cellular harmony and balance simultaneously',
      benefits: ['Deep restoration', 'Cell harmony', 'Balance'],
      usage: 'Supports cellular harmony and balance simultaneously',
      duration: 1200,
      isPremium: true
    },
    {
      id: 'bath-vitality-support',
      name: 'Vitality Support Bath',
      frequencies: [741, 40, 639],
      category: 'healing',
      description: 'Balance, heart coherence, and gamma pulses for vitality',
      benefits: ['Vitality support', 'Balance', 'Heart coherence'],
      usage: 'Balance, heart coherence, and gamma pulses for vitality',
      duration: 1200,
      isPremium: true
    }
  ],

  // MENTAL/FOCUS BATHS (5)
  mental: [
    {
      id: 'bath-focus',
      name: 'Focus Bath',
      frequencies: [14, 40, 528],
      category: 'mental',
      description: 'Sharp focus and positive mindset while working',
      benefits: ['Enhanced focus', 'Mental clarity', 'Positive mood'],
      usage: 'Sharp focus and positive mindset while working',
      duration: 1200,
      isPremium: false
    },
    {
      id: 'bath-brain-fog',
      name: 'Brain Fog Clearer',
      frequencies: [7.83, 10, 741],
      category: 'mental',
      description: 'Clears mental fog with Earth resonance support',
      benefits: ['Mental clarity', 'Fog clearing', 'Earth grounding'],
      usage: 'Clears mental fog with Earth resonance support',
      duration: 1200,
      isPremium: false
    },
    {
      id: 'bath-neuroplasticity',
      name: 'Neuroplasticity Expansion',
      frequencies: [6, 40, 10],
      category: 'mental',
      description: 'Boosts memory, creativity, and neural rewiring',
      benefits: ['Neuroplasticity', 'Memory boost', 'Creativity'],
      usage: 'Boosts memory, creativity, and neural rewiring',
      duration: 1200,
      isPremium: true
    },
    {
      id: 'bath-logic-reasoning',
      name: 'Logic & Reasoning Power',
      frequencies: [14, 40, 7.83],
      category: 'mental',
      description: 'Sharpens thinking while keeping you grounded',
      benefits: ['Logic enhancement', 'Reasoning', 'Grounding'],
      usage: 'Sharpens thinking while keeping you grounded',
      duration: 1200,
      isPremium: true
    },
    {
      id: 'bath-deep-study',
      name: 'Deep Study Flow',
      frequencies: [10, 14, 528],
      category: 'mental',
      description: 'Clarity + focus + positive emotional tone for studying',
      benefits: ['Study focus', 'Learning enhancement', 'Clarity'],
      usage: 'Clarity + focus + positive emotional tone for studying',
      duration: 1200,
      isPremium: true
    }
  ],

  // SPIRITUAL BATHS (5)
  spiritual: [
    {
      id: 'bath-awakening-gateway',
      name: 'Awakening Gateway',
      frequencies: [4, 963, 136.1],
      category: 'spiritual',
      description: 'For breakthroughs and cosmic alignment',
      benefits: ['Spiritual awakening', 'Cosmic alignment', 'Breakthroughs'],
      usage: 'For breakthroughs and cosmic alignment',
      duration: 1800,
      isPremium: false
    },
    {
      id: 'bath-chakra-alignment',
      name: 'Chakra Alignment Sequence',
      frequencies: [396, 417, 528, 639, 741, 852, 963],
      category: 'spiritual',
      description: 'Full chakra sweep from root to crown',
      benefits: ['Chakra balancing', 'Energy alignment', 'Full body harmony'],
      usage: '3–7 min per tone to sweep the energy body',
      duration: 2400,
      isPremium: true
    },
    {
      id: 'bath-kundalini',
      name: 'Kundalini Rising Bath',
      frequencies: [396, 528, 852],
      category: 'spiritual',
      description: 'Activates kundalini flow upward safely',
      benefits: ['Kundalini activation', 'Energy flow', 'Spiritual awakening'],
      usage: 'Activates kundalini flow upward safely',
      duration: 1800,
      isPremium: true
    },
    {
      id: 'bath-universal-harmony',
      name: 'Universal Harmony Bath',
      frequencies: [432, 7.83, 963],
      category: 'spiritual',
      description: 'Aligns the body with universal peace signals',
      benefits: ['Universal harmony', 'Peace', 'Divine connection'],
      usage: 'Aligns the body with universal peace signals',
      duration: 1800,
      isPremium: true
    },
    {
      id: 'bath-crown-light',
      name: 'Crown Light Expansion',
      frequencies: [963, 136.1, 888],
      category: 'spiritual',
      description: 'Connects divine consciousness with abundance streams',
      benefits: ['Crown activation', 'Divine connection', 'Abundance'],
      usage: 'Connects divine consciousness with abundance streams',
      duration: 1800,
      isPremium: true
    }
  ],

  // EMOTIONAL BATHS (5)
  emotional: [
    {
      id: 'bath-calm-release',
      name: 'Calm Release Bath',
      frequencies: [396, 639, 10],
      category: 'emotional',
      description: 'Grounding and emotional resilience with alpha entrainment',
      benefits: ['Deep calm', 'Emotional resilience', 'Peace'],
      usage: 'Grounding and emotional resilience with alpha entrainment',
      duration: 1200,
      isPremium: false
    },
    {
      id: 'bath-fear-release-deep',
      name: 'Fear Release Deep Release',
      frequencies: [396, 417, 7.83],
      category: 'emotional',
      description: 'Removes lingering stress with Earth resonance support',
      benefits: ['Fear release', 'Stress release', 'Grounding'],
      usage: 'Removes lingering stress with Earth resonance support',
      duration: 1200,
      isPremium: true
    },
    {
      id: 'bath-emotional-reset',
      name: 'Emotional Reset Bath',
      frequencies: [396, 639, 528],
      category: 'emotional',
      description: 'Rebalances heart and mind for harmony',
      benefits: ['Emotional balance', 'Heart harmony', 'Mental clarity'],
      usage: 'Rebalances heart and mind for harmony',
      duration: 1200,
      isPremium: true
    },
    {
      id: 'bath-deep-calm',
      name: 'Deep Calm Bath',
      frequencies: [110, 432, 10],
      category: 'emotional',
      description: 'Calms mind and stabilizes breathing via alpha entrainment',
      benefits: ['Deep calm', 'Breathing support', 'Peace'],
      usage: 'Calms mind and stabilizes breathing via alpha entrainment',
      duration: 1200,
      isPremium: true
    },
    {
      id: 'bath-self-love',
      name: 'Self-Love Enhancement',
      frequencies: [528, 639, 852],
      category: 'emotional',
      description: 'Amplifies self-worth and inner joy',
      benefits: ['Self love', 'Self worth', 'Inner joy'],
      usage: 'Amplifies self-worth and inner joy',
      duration: 1200,
      isPremium: true
    }
  ],

  // PSYCHIC BATHS (5)
  psychic: [
    {
      id: 'bath-third-eye-ascension',
      name: 'Third Eye Ascension',
      frequencies: [852, 936, 40],
      category: 'psychic',
      description: 'Boosts intuition with gamma bursts',
      benefits: ['Third eye activation', 'Intuition boost', 'Psychic enhancement'],
      usage: 'Boosts intuition with gamma bursts',
      duration: 1800,
      isPremium: true
    },
    {
      id: 'bath-astral-navigator',
      name: 'Astral Navigator',
      frequencies: [4, 7.83, 852],
      category: 'psychic',
      description: 'Ideal for out-of-body exploration',
      benefits: ['Astral projection', 'OBE support', 'Theta trance'],
      usage: 'Ideal for out-of-body exploration',
      duration: 1800,
      isPremium: true
    },
    {
      id: 'bath-remote-viewing',
      name: 'Remote Viewing Gateway',
      frequencies: [6, 8, 852],
      category: 'psychic',
      description: 'Enhances clairvoyance and distant sensing',
      benefits: ['Remote viewing', 'Clairvoyance', 'Distant sensing'],
      usage: 'Enhances clairvoyance and distant sensing',
      duration: 1800,
      isPremium: true
    },
    {
      id: 'bath-psychic-amplifier',
      name: 'Psychic Amplifier Bath',
      frequencies: [852, 936, 639],
      category: 'psychic',
      description: 'Combines intuition with heart coherence for ESP',
      benefits: ['ESP enhancement', 'Intuition', 'Heart coherence'],
      usage: 'Combines intuition with heart coherence for ESP',
      duration: 1800,
      isPremium: true
    },
    {
      id: 'bath-pineal-light',
      name: 'Pineal Light Activation',
      frequencies: [852, 963, 7.83],
      category: 'psychic',
      description: 'Decalcifies and activates pineal awareness',
      benefits: ['Pineal activation', 'Decalcification', 'Awareness'],
      usage: 'Decalcifies and activates pineal awareness',
      duration: 1800,
      isPremium: true
    }
  ],

  // MANIFESTATION BATHS (4)
  manifestation: [
    {
      id: 'bath-abundance-flow',
      name: 'Abundance Flow',
      frequencies: [396, 528, 888],
      category: 'manifestation',
      description: 'Clears scarcity, charges intentions with love, amplifies abundance',
      benefits: ['Abundance', 'Scarcity clearing', 'Love charging'],
      usage: 'Clears scarcity, charges intentions with love, amplifies abundance',
      duration: 1200,
      isPremium: true
    },
    {
      id: 'bath-opportunity-magnet',
      name: 'Opportunity Magnet',
      frequencies: [7.83, 639, 222],
      category: 'manifestation',
      description: 'Grounds, opens the heart, and aligns partnership energy',
      benefits: ['Opportunity attraction', 'Heart opening', 'Partnership'],
      usage: 'Grounds, opens the heart, and aligns partnership energy',
      duration: 1200,
      isPremium: true
    },
    {
      id: 'bath-infinite-prosperity',
      name: 'Infinite Prosperity Gateway',
      frequencies: [111, 528, 888, 963],
      category: 'manifestation',
      description: 'Divine inspiration → love → abundance → unity field',
      benefits: ['Prosperity', 'Divine inspiration', 'Unity consciousness'],
      usage: 'Divine inspiration → love → abundance → unity field',
      duration: 1800,
      isPremium: true
    },
    {
      id: 'bath-wealth-alignment',
      name: 'Wealth Alignment Sequence',
      frequencies: [396, 528, 639, 888],
      category: 'manifestation',
      description: 'Ascending sequence for wealth manifestation',
      benefits: ['Wealth alignment', 'Financial abundance', 'Manifestation'],
      usage: 'Play ascending; focus intention at each step',
      duration: 1800,
      isPremium: true
    }
  ],

  // SLEEP BATHS (3)
  sleep: [
    {
      id: 'bath-deep-sleep',
      name: 'Deep Sleep Bath',
      frequencies: [174, 285, 0.5],
      category: 'sleep',
      description: 'Delta waves for deepest, most restorative sleep',
      benefits: ['Deep sleep', 'Full restoration', 'Recovery'],
      usage: 'Play at bedtime for 8+ hours of deep rest',
      duration: 28800,
      isPremium: false
    },
    {
      id: 'bath-lucid-dream',
      name: 'Lucid Dream Bath',
      frequencies: [3, 7, 40],
      category: 'sleep',
      description: 'REM sleep with gamma awareness for lucid dreaming',
      benefits: ['Lucid dreaming', 'Awareness in dreams', 'Dream recall'],
      usage: 'Play during intended sleep window for lucid dreams',
      duration: 1800,
      isPremium: true
    },
    {
      id: 'bath-sleep-recovery',
      name: 'Sleep Recovery Bath',
      frequencies: [0.5, 285, 174],
      category: 'sleep',
      description: 'Extended deep sleep for catching up on rest',
      benefits: ['Sleep recovery', 'Deep restoration', 'Energy renewal'],
      usage: 'Play for extended sleep sessions',
      duration: 28800,
      isPremium: true
    }
  ],

  // Helper functions
  getAvailableBaths: function(subscriptionTier = 'free') {
    const allBaths = [
      ...this.wellness,
      ...this.mental,
      ...this.spiritual,
      ...this.emotional,
      ...this.psychic,
      ...this.manifestation,
      ...this.sleep
    ];
    
    if (subscriptionTier === 'free') {
      return allBaths.filter(b => !b.isPremium);
    }
    return allBaths; // 'weekly' or 'lifetime' get all
  },

  getBathById: function(id) {
    const allBaths = [
      ...this.wellness,
      ...this.mental,
      ...this.spiritual,
      ...this.emotional,
      ...this.psychic,
      ...this.manifestation,
      ...this.sleep
    ];
    return allBaths.find(b => b.id === id);
  },

  getBathsByCategory: function(category, subscriptionTier = 'free') {
    const allBaths = this.getAvailableBaths(subscriptionTier);
    return allBaths.filter(b => b.category === category);
  },

  searchBaths: function(query, subscriptionTier = 'free') {
    const allBaths = this.getAvailableBaths(subscriptionTier);
    const q = query.toLowerCase();
    return allBaths.filter(b => 
      b.name.toLowerCase().includes(q) || 
      b.id.toLowerCase().includes(q) ||
      b.benefits.some(bn => bn.toLowerCase().includes(q)) ||
      b.description.toLowerCase().includes(q)
    );
  },

  getAllBaths: function(subscriptionTier = 'free') {
    return this.getAvailableBaths(subscriptionTier);
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FREQUENCY_BATHS;
}
