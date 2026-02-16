// SMART_STACKS.js - AI-curated frequency combinations
// Automatically matched to user goals and preferences

const SMART_STACKS = {
  // Focus & Productivity (8 stacks)
  focus: [
    {
      id: 'stack-deep-focus',
      name: 'Deep Focus',
      goal: 'I want deep concentration',
      description: 'Gamma + Beta waves for enhanced cognitive performance',
      emoji: '🧠',
      frequencies: [40, 14, 10],
      reasoning: '40Hz Gamma boosts memory and focus, 14Hz Beta maintains alertness, 10Hz Alpha provides calm focus.',
      isPremium: true,
      duration: 600
    },
    {
      id: 'stack-study-session',
      name: 'Study Session',
      goal: 'I need to study or learn',
      description: 'Memory enhancement and information retention',
      emoji: '📚',
      frequencies: [528, 40, 12],
      reasoning: '528Hz harmony frequency supports learning, 40Hz enhances memory encoding, 12Hz promotes information processing.',
      isPremium: true,
      duration: 1800
    },
    {
      id: 'stack-laser-focus',
      name: 'Laser Focus',
      goal: 'I need intense concentration',
      description: 'Peak performance frequencies',
      emoji: '🎯',
      frequencies: [40, 14, 639],
      reasoning: '40Hz peak cognition, 14Hz sharp focus, 639Hz harmonizes brain hemispheres.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-executive-function',
      name: 'Executive Function',
      goal: 'I need to make decisions',
      description: 'Beta waves for analytical thinking',
      emoji: '👔',
      frequencies: [16, 14, 12],
      reasoning: '16Hz-14Hz-12Hz Beta band for logical analysis and decision making.',
      isPremium: true,
      duration: 900
    },
    {
      id: 'stack-programming-flow',
      name: 'Programming Flow',
      goal: 'I need to code efficiently',
      description: 'Combined focus and pattern recognition',
      emoji: '💻',
      frequencies: [40, 10, 528],
      reasoning: '40Hz memory, 10Hz sustained focus, 528Hz coherence for code logic.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-quick-alert',
      name: 'Quick Alert',
      goal: 'I need to wake up fast',
      description: 'Immediate alertness boost',
      emoji: '⚡',
      frequencies: [18, 14],
      reasoning: '18Hz peak beta for maximum alertness, 14Hz sharp focus.',
      isPremium: false,
      duration: 300
    },
    {
      id: 'stack-morning-energy',
      name: 'Morning Energy',
      goal: 'I need to start my day strong',
      description: 'Gentle alertness and vitality',
      emoji: '🌅',
      frequencies: [124, 14, 10],
      reasoning: '124Hz vitality, 14Hz focus, 10Hz calm alertness.',
      isPremium: false,
      duration: 600
    },
    {
      id: 'stack-reading-focus',
      name: 'Reading Focus',
      goal: 'I want to read better',
      description: 'Comprehension and retention',
      emoji: '📖',
      frequencies: [9, 10, 528],
      reasoning: '9Hz learning alpha, 10Hz sustained focus, 528Hz harmony.',
      isPremium: false,
      duration: 900
    }
  ],

  // Relaxation & Stress Relief (8 stacks)
  relaxation: [
    {
      id: 'stack-instant-calm',
      name: 'Instant Calm',
      goal: 'I feel stressed or overwhelmed',
      description: 'Rapid calm and nervous system support',
      emoji: '🌸',
      frequencies: [396, 174, 639],
      reasoning: '396Hz releases fear/guilt, 174Hz promotes deep calm, 639Hz harmonizes.',
      isPremium: false,
      duration: 600
    },
    {
      id: 'stack-deep-relaxation',
      name: 'Deep Relaxation',
      goal: 'I want to deeply relax',
      description: 'Theta waves with solfeggio frequencies',
      emoji: '🧘',
      frequencies: [528, 6, 432],
      reasoning: '528Hz miracle tone, 6Hz Theta deep relaxation, 432Hz natural tuning.',
      isPremium: false,
      duration: 1200
    },
    {
      id: 'stack-anxiety-release',
      name: 'Anxiety Release',
      goal: 'I have anxiety',
      description: 'Grounding and calming support',
      emoji: '🕊️',
      frequencies: [174, 396, 7.83],
      reasoning: '174Hz comfort, 396Hz fear release, 7.83Hz Earth grounding.',
      isPremium: false,
      duration: 900
    },
    {
      id: 'stack-tension-relief',
      name: 'Tension Relief',
      goal: 'My muscles are tense',
      description: 'Physical relaxation support',
      emoji: '💆',
      frequencies: [285, 6, 174],
      reasoning: '285Hz tissue support, 6Hz Theta relaxation, 174Hz comfort.',
      isPremium: false,
      duration: 600
    },
    {
      id: 'stack-midday-reset',
      name: 'Midday Reset',
      goal: 'I need to reset at noon',
      description: 'Gentle recharge and refocus',
      emoji: '☀️',
      frequencies: [432, 7.83, 10],
      reasoning: '432Hz natural harmony, 7.83Hz Schumann grounding, 10Hz calm focus.',
      isPremium: false,
      duration: 900
    },
    {
      id: 'stack-emotional-balance',
      name: 'Emotional Balance',
      goal: 'I feel emotionally overwhelmed',
      description: 'Heart and mind harmony',
      emoji: '💙',
      frequencies: [639, 528, 6],
      reasoning: '639Hz relationships/self-love, 528Hz transformation, 6Hz deep theta.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-nervous-system-reset',
      name: 'Nervous System Reset',
      goal: 'I need parasympathetic activation',
      description: 'Vagus nerve and nervous system support',
      emoji: '🧠',
      frequencies: [40, 6, 174],
      reasoning: '40Hz vagal tone activation, 6Hz theta relaxation, 174Hz comfort.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-break-time',
      name: 'Quick Break',
      goal: 'I need a 5-minute reset',
      description: 'Fast tension relief',
      emoji: '⏸️',
      frequencies: [7.83, 174],
      reasoning: '7.83Hz Earth sync, 174Hz quick calm.',
      isPremium: false,
      duration: 300
    }
  ],

  // Sleep & Rest (8 stacks)
  sleep: [
    {
      id: 'stack-fall-asleep',
      name: 'Fall Asleep Fast',
      goal: 'I can\'t fall asleep',
      description: 'Delta + Theta waves for quick sleep onset',
      emoji: '😴',
      frequencies: [174, 2, 4],
      reasoning: '174Hz promotes deep calm, 2Hz deep Delta for sleep, 4Hz Theta for transition.',
      isPremium: false,
      duration: 1800
    },
    {
      id: 'stack-deep-sleep',
      name: 'Deep Restorative Sleep',
      goal: 'I need better sleep quality',
      description: 'Frequencies for deep, restorative rest',
      emoji: '🌙',
      frequencies: [174, 285, 0.5],
      reasoning: '174Hz relaxation, 285Hz tissue support, 0.5Hz ultra-low Delta.',
      isPremium: false,
      duration: 28800
    },
    {
      id: 'stack-lucid-dreaming',
      name: 'Lucid Dreaming',
      goal: 'I want to lucid dream',
      description: 'REM sleep and consciousness awareness',
      emoji: '🌟',
      frequencies: [3, 7, 40],
      reasoning: '3Hz REM sleep, 7Hz theta-alpha bridge, 40Hz consciousness.',
      isPremium: true,
      duration: 1800
    },
    {
      id: 'stack-rem-sleep',
      name: 'REM Sleep Enhancement',
      goal: 'I want vivid dreams',
      description: 'Vivid REM and dream enhancement',
      emoji: '🎬',
      frequencies: [3, 10, 528],
      reasoning: '3Hz REM, 10Hz alpha dream gate, 528Hz harmony.',
      isPremium: true,
      duration: 1800
    },
    {
      id: 'stack-nap-quick',
      name: 'Quick Power Nap',
      goal: 'I need a 20-minute nap',
      description: 'Fast refreshing nap support',
      emoji: '🛌',
      frequencies: [4, 2],
      reasoning: '4Hz quick theta sleep induction, 2Hz delta for refreshment.',
      isPremium: false,
      duration: 1200
    },
    {
      id: 'stack-sleep-maintenance',
      name: 'Stay Asleep',
      goal: 'I wake up in the middle of night',
      description: 'Deep sleep maintenance',
      emoji: '😴',
      frequencies: [0.5, 2, 174],
      reasoning: '0.5Hz deepest sleep, 2Hz delta maintenance, 174Hz comfort.',
      isPremium: true,
      duration: 3600
    },
    {
      id: 'stack-sleep-recovery',
      name: 'Sleep Recovery',
      goal: 'I need to catch up on sleep',
      description: 'Extended deep restoration',
      emoji: '😪',
      frequencies: [0.5, 285, 174],
      reasoning: '0.5Hz deep delta, 285Hz tissue repair, 174Hz comfort support.',
      isPremium: true,
      duration: 28800
    },
    {
      id: 'stack-evening-wind-down',
      name: 'Evening Wind Down',
      goal: 'I need to prepare for sleep',
      description: 'Gradual transition to sleep',
      emoji: '🌙',
      frequencies: [7.83, 6, 4],
      reasoning: '7.83Hz earth sync, 6Hz theta onset, 4Hz sleep stage.',
      isPremium: false,
      duration: 1800
    }
  ],

  // Energy & Vitality (8 stacks)
  energy: [
    {
      id: 'stack-morning-power',
      name: 'Morning Power',
      goal: 'I need morning energy',
      description: 'Vitality and vigor boost',
      emoji: '🔋',
      frequencies: [124, 18, 14],
      reasoning: '124Hz vitality, 18Hz peak alertness, 14Hz focus.',
      isPremium: false,
      duration: 600
    },
    {
      id: 'stack-sustained-energy',
      name: 'Sustained Energy',
      goal: 'I need energy all day',
      description: 'Long-term vitality support',
      emoji: '⚡',
      frequencies: [124, 12, 10],
      reasoning: '124Hz vitality baseline, 12Hz alert but calm, 10Hz sustainable focus.',
      isPremium: false,
      duration: 1800
    },
    {
      id: 'stack-afternoon-slump',
      name: 'Beat Afternoon Slump',
      goal: 'I have afternoon fatigue',
      description: 'Recharge mid-afternoon',
      emoji: '☕',
      frequencies: [124, 14, 432],
      reasoning: '124Hz vitality, 14Hz focus, 432Hz natural energy.',
      isPremium: false,
      duration: 600
    },
    {
      id: 'stack-workout-prep',
      name: 'Workout Preparation',
      goal: 'I\'m about to exercise',
      description: 'Pre-workout energy and motivation',
      emoji: '💪',
      frequencies: [144.72, 16, 124],
      reasoning: '144.72Hz Mars motivation, 16Hz high beta activity, 124Hz vitality.',
      isPremium: true,
      duration: 600
    },
    {
      id: 'stack-post-workout-recovery',
      name: 'Post-Workout Recovery',
      goal: 'I just finished exercising',
      description: 'Muscle recovery and regeneration',
      emoji: '🏃',
      frequencies: [285, 120, 528],
      reasoning: '285Hz tissue repair, 120Hz muscle support, 528Hz healing.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-immune-boost',
      name: 'Immune Boost',
      goal: 'I want to support my immune system',
      description: 'Immune function enhancement',
      emoji: '🛡️',
      frequencies: [741, 528, 432],
      reasoning: '741Hz immune support, 528Hz DNA/healing, 432Hz natural harmony.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-vitality-recharge',
      name: 'Vitality Recharge',
      goal: 'I feel drained',
      description: 'Deep energy restoration',
      emoji: '✨',
      frequencies: [124, 2.5, 285],
      reasoning: '124Hz vitality, 2.5Hz inner strength, 285Hz cellular wellness.',
      isPremium: true,
      duration: 1800
    },
    {
      id: 'stack-stamina-builder',
      name: 'Stamina Builder',
      goal: 'I want to build endurance',
      description: 'Long-term energy capacity',
      emoji: '🏔️',
      frequencies: [124, 250, 528],
      reasoning: '124Hz vitality, 250Hz recovery, 528Hz regeneration.',
      isPremium: true,
      duration: 1800
    }
  ],

  // Healing & Wellness (8 stacks)
  healing: [
    {
      id: 'stack-comfort-support',
      name: 'Comfort Support',
      goal: 'I need comfort',
      description: 'Soothing and supportive frequencies',
      emoji: '💕',
      frequencies: [174, 285, 528],
      reasoning: '174Hz deep comfort, 285Hz tissue support, 528Hz healing.',
      isPremium: false,
      duration: 1200
    },
    {
      id: 'stack-cellular-healing',
      name: 'Cellular Healing',
      goal: 'I want to support cellular wellness',
      description: 'DNA and cellular regeneration',
      emoji: '🧬',
      frequencies: [528, 285, 432],
      reasoning: '528Hz DNA repair, 285Hz tissue wellness, 432Hz natural tuning.',
      isPremium: true,
      duration: 1800
    },
    {
      id: 'stack-detox-cleanse',
      name: 'Detox & Cleanse',
      goal: 'I want to support my body\'s natural cleansing',
      description: 'Organ and system purification',
      emoji: '🌿',
      frequencies: [741, 852, 432],
      reasoning: '741Hz detox, 852Hz spiritual clarity, 432Hz natural balance.',
      isPremium: true,
      duration: 1800
    },
    {
      id: 'stack-inflammation-relief',
      name: 'Inflammation Relief',
      goal: 'I have swelling or inflammation',
      description: 'Reduce inflammatory response',
      emoji: '🌊',
      frequencies: [174, 285, 1.5],
      reasoning: '174Hz comfort, 285Hz tissue repair, 1.5Hz joint support.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-circulation-boost',
      name: 'Circulation Boost',
      goal: 'I want to improve circulation',
      description: 'Blood flow and oxygenation',
      emoji: '💓',
      frequencies: [33, 341.3, 528],
      reasoning: '33Hz circulation flow, 341.3Hz heart harmony, 528Hz healing.',
      isPremium: true,
      duration: 900
    },
    {
      id: 'stack-nervous-system-heal',
      name: 'Nervous System Healing',
      goal: 'I want to heal my nervous system',
      description: 'Neural repair and harmony',
      emoji: '🧠',
      frequencies: [8, 6, 528],
      reasoning: '8Hz nervous system balance, 6Hz theta healing, 528Hz regeneration.',
      isPremium: true,
      duration: 1800
    },
    {
      id: 'stack-pain-relief',
      name: 'Pain Support',
      goal: 'I want to support my body through discomfort',
      description: 'Comfort and ease support',
      emoji: '🌟',
      frequencies: [174, 95, 528],
      reasoning: '174Hz comfort, 95Hz relaxation support, 528Hz healing frequency.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-full-spectrum-wellness',
      name: 'Full Spectrum Wellness',
      goal: 'I want complete wellness support',
      description: 'All-systems optimization',
      emoji: '🎆',
      frequencies: [528, 285, 741, 432, 639],
      reasoning: 'Comprehensive wellness stack with healing, tissue, immune, harmony, and love frequencies.',
      isPremium: true,
      duration: 1800
    }
  ],

  // Creativity & Flow (8 stacks)
  creativity: [
    {
      id: 'stack-creative-flow',
      name: 'Creative Flow',
      goal: 'I want to be more creative',
      description: 'Alpha-Theta border state for creative insights',
      emoji: '🎨',
      frequencies: [417, 7.83, 10],
      reasoning: '417Hz facilitates change, 7.83Hz Schumann resonance, 10Hz Alpha creativity.',
      isPremium: false,
      duration: 1200
    },
    {
      id: 'stack-artistic-inspiration',
      name: 'Artistic Inspiration',
      goal: 'I need artistic inspiration',
      description: 'Access creative subconscious',
      emoji: '🖌️',
      frequencies: [5, 10, 417],
      reasoning: '5Hz creative theta, 10Hz alpha visualization, 417Hz transformation.',
      isPremium: false,
      duration: 1200
    },
    {
      id: 'stack-writing-flow',
      name: 'Writing Flow',
      goal: 'I want to write better',
      description: 'Creative expression and clarity',
      emoji: '✍️',
      frequencies: [417, 10, 639],
      reasoning: '417Hz change/creativity, 10Hz focus, 639Hz communication.',
      isPremium: true,
      duration: 1800
    },
    {
      id: 'stack-music-inspiration',
      name: 'Music Inspiration',
      goal: 'I want to make or play music',
      description: 'Musical creativity and expression',
      emoji: '🎵',
      frequencies: [432, 5, 639],
      reasoning: '432Hz natural tuning, 5Hz creative theta, 639Hz expression.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-innovation-spark',
      name: 'Innovation Spark',
      goal: 'I need a breakthrough idea',
      description: 'Innovative thinking and problem-solving',
      emoji: '💡',
      frequencies: [40, 5, 432],
      reasoning: '40Hz cognitive breakthrough, 5Hz creative access, 432Hz harmony.',
      isPremium: true,
      duration: 900
    },
    {
      id: 'stack-design-flow',
      name: 'Design Flow',
      goal: 'I want to design something',
      description: 'Visual creativity and composition',
      emoji: '🎭',
      frequencies: [10, 432, 639],
      reasoning: '10Hz visualization, 432Hz harmony/proportion, 639Hz aesthetics.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-problem-solving',
      name: 'Creative Problem-Solving',
      goal: 'I need to solve a creative problem',
      description: 'Lateral thinking and innovation',
      emoji: '🧩',
      frequencies: [40, 7.83, 417],
      reasoning: '40Hz cognitive function, 7.83Hz intuition link, 417Hz change/solutions.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-creative-blocks-release',
      name: 'Clear Creative Blocks',
      goal: 'I\'m creatively blocked',
      description: 'Release creative inhibitions',
      emoji: '🔓',
      frequencies: [417, 396, 5],
      reasoning: '417Hz transformation, 396Hz fear release, 5Hz creative access.',
      isPremium: true,
      duration: 1500
    }
  ],

  // Meditation & Spirituality (8 stacks)
  meditation: [
    {
      id: 'stack-deep-meditation',
      name: 'Deep Meditation',
      goal: 'I want to meditate deeply',
      description: 'Theta-Delta brainwave entrainment',
      emoji: '🧘‍♀️',
      frequencies: [4, 6, 528],
      reasoning: '4Hz deep meditation entry, 6Hz sustained theta, 528Hz spiritual resonance.',
      isPremium: false,
      duration: 1800
    },
    {
      id: 'stack-mindfulness',
      name: 'Mindfulness Practice',
      goal: 'I want to practice mindfulness',
      description: 'Present moment awareness',
      emoji: '🌬️',
      frequencies: [10, 7.83, 639],
      reasoning: '10Hz aware alpha, 7.83Hz grounding, 639Hz present heart connection.',
      isPremium: false,
      duration: 1200
    },
    {
      id: 'stack-transcendence',
      name: 'Transcendence',
      goal: 'I want to transcend',
      description: 'Higher consciousness and oneness',
      emoji: '✨',
      frequencies: [963, 40, 1440],
      reasoning: '963Hz divine connection, 40Hz expanded consciousness, 1440Hz universal.',
      isPremium: true,
      duration: 1800
    },
    {
      id: 'stack-chakra-balancing',
      name: 'Chakra Balancing',
      goal: 'I want to balance my chakras',
      description: 'Energy center harmony',
      emoji: '🌈',
      frequencies: [256, 288, 320, 341.3, 384, 426.7, 480],
      reasoning: 'All 7 chakra frequencies in ascending order for full system balance.',
      isPremium: true,
      duration: 2100
    },
    {
      id: 'stack-kundalini-activation',
      name: 'Kundalini Activation',
      goal: 'I want to activate kundalini',
      description: 'Sacred energy awakening',
      emoji: '🔥',
      frequencies: [256, 417, 963, 40],
      reasoning: '256Hz root activation, 417Hz transformation flow, 963Hz divine, 40Hz activation.',
      isPremium: true,
      duration: 1800
    },
    {
      id: 'stack-third-eye-activation',
      name: 'Third Eye Activation',
      goal: 'I want to activate my third eye',
      description: 'Inner vision and intuition awakening',
      emoji: '👁️',
      frequencies: [426.7, 6, 40],
      reasoning: '426.7Hz third eye, 6Hz intuitive theta, 40Hz activation.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-heart-opening',
      name: 'Heart Opening',
      goal: 'I want to open my heart',
      description: 'Heart center expansion and love',
      emoji: '💚',
      frequencies: [341.3, 528, 639],
      reasoning: '341.3Hz heart chakra, 528Hz love frequency, 639Hz harmony.',
      isPremium: true,
      duration: 1200
    },
    {
      id: 'stack-spiritual-awakening',
      name: 'Spiritual Awakening',
      goal: 'I want spiritual awakening',
      description: 'Higher self connection',
      emoji: '🌟',
      frequencies: [852, 963, 1074],
      reasoning: '852Hz spiritual clarity, 963Hz divine connection, 1074Hz unity consciousness.',
      isPremium: true,
      duration: 1800
    }
  ],

  // Helper functions
  getStacksByGoal: function(goal, subscriptionTier = 'free') {
    const allStacks = [
      ...this.focus,
      ...this.relaxation,
      ...this.sleep,
      ...this.energy,
      ...this.healing,
      ...this.creativity,
      ...this.meditation
    ];
    
    let filtered = allStacks.filter(s => 
      s.goal.toLowerCase().includes(goal.toLowerCase()) ||
      s.name.toLowerCase().includes(goal.toLowerCase())
    );

    if (subscriptionTier === 'free') {
      filtered = filtered.filter(s => !s.isPremium);
    }

    return filtered;
  },

  getStackById: function(id) {
    const allStacks = [
      ...this.focus,
      ...this.relaxation,
      ...this.sleep,
      ...this.energy,
      ...this.healing,
      ...this.creativity,
      ...this.meditation
    ];
    return allStacks.find(s => s.id === id);
  },

  getStacksByCategory: function(category, subscriptionTier = 'free') {
    const stacks = this[category] || [];
    if (subscriptionTier === 'free') {
      return stacks.filter(s => !s.isPremium);
    }
    return stacks;
  },

  getAllStacks: function(subscriptionTier = 'free') {
    const allStacks = [
      ...this.focus,
      ...this.relaxation,
      ...this.sleep,
      ...this.energy,
      ...this.healing,
      ...this.creativity,
      ...this.meditation
    ];
    
    if (subscriptionTier === 'free') {
      return allStacks.filter(s => !s.isPremium);
    }
    return allStacks;
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SMART_STACKS;
}
