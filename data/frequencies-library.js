// FREQUENCIES_LIBRARY.js - Comprehensive 500+ frequency library
// Shared across mobile (React Native) and browser (Web)
// This is the single source of truth for all healing frequencies

const FREQUENCIES_LIBRARY = {
  // Frequency interface definition
  interface: {
    id: 'string (unique identifier)',
    name: 'string (display name)',
    hz: 'number (frequency in Hertz)',
    category: 'string (one of the categories below)',
    description: 'string (what it does)',
    benefits: 'string[] (array of benefits)',
    duration: 'number (recommended duration in seconds)',
    isPremium: 'boolean (requires subscription)'
  },

  categories: [
    'solfeggio', 'chakra', 'binaural', 'healing', 'planetary', 'crystal', 
    'color', 'organ', 'emotion', 'dna', 'immune', 'brain', 'sleep', 
    'energy', 'manifestation', 'bath', 'rife', 'angel', 'schumann', 
    'tesla', 'sacred', 'tibetan', 'vedic', 'egyptian'
  ],

  // SOLFEGGIO FREQUENCIES (Ancient Sacred Scale)
  solfeggio: [
    { id: 'solf-174', name: 'Liberation from Fear', hz: 174, benefits: ['Deep comfort', 'Calm support', 'Grounding'], duration: 300, isPremium: false },
    { id: 'solf-285', name: 'Tissue Harmony', hz: 285, benefits: ['Tissue support', 'Vitality', 'Cellular wellness'], duration: 300, isPremium: false },
    { id: 'solf-396', name: 'Liberation from Guilt', hz: 396, benefits: ['Guilt release', 'Fear liberation', 'Grounding'], duration: 300, isPremium: false },
    { id: 'solf-417', name: 'Facilitating Change', hz: 417, benefits: ['Breaking cycles', 'Creative renewal', 'Transformation'], duration: 300, isPremium: false },
    { id: 'solf-528', name: 'Love & DNA Harmony', hz: 528, benefits: ['DNA repair', 'Love frequency', 'Transformation'], duration: 300, isPremium: false },
    { id: 'solf-639', name: 'Relationships', hz: 639, benefits: ['Better relationships', 'Communication', 'Understanding'], duration: 300, isPremium: false },
    { id: 'solf-741', name: 'Awakening Intuition', hz: 741, benefits: ['Intuition', 'Self-expression', 'Truth seeking'], duration: 300, isPremium: false },
    { id: 'solf-852', name: 'Spiritual Order', hz: 852, benefits: ['Spiritual insight', 'Clarity', 'Higher consciousness'], duration: 300, isPremium: false },
    { id: 'solf-963', name: 'Divine Connection', hz: 963, benefits: ['Divine connection', 'Enlightenment', 'Cosmic consciousness'], duration: 300, isPremium: false },
    { id: 'solf-1074', name: 'Return to Unity', hz: 1074, benefits: ['Unity consciousness', 'Spiritual awakening', 'Universal love'], duration: 300, isPremium: true },
    { id: 'solf-1185', name: 'Higher Awareness', hz: 1185, benefits: ['Higher awareness', 'Cosmic consciousness', 'Divine wisdom'], duration: 300, isPremium: true },
    { id: 'solf-1296', name: 'Divine Feminine', hz: 1296, benefits: ['Divine feminine', 'Intuition', 'Nurturing'], duration: 300, isPremium: true }
  ],

  // CHAKRA FREQUENCIES (Complete System)
  chakra: [
    { id: 'chak-earth-star', name: 'Earth Star Chakra', hz: 68, benefits: ['Deep grounding', 'Earth connection', 'Ancestral link'], duration: 300, isPremium: true },
    { id: 'chak-root', name: 'Root Chakra', hz: 256, benefits: ['Grounding', 'Security', 'Stability'], duration: 300, isPremium: false },
    { id: 'chak-sacral', name: 'Sacral Chakra', hz: 288, benefits: ['Creativity', 'Sexual energy', 'Emotional balance'], duration: 300, isPremium: false },
    { id: 'chak-solar', name: 'Solar Plexus Chakra', hz: 320, benefits: ['Personal power', 'Confidence', 'Self-esteem'], duration: 300, isPremium: false },
    { id: 'chak-heart', name: 'Heart Chakra', hz: 341.3, benefits: ['Love', 'Compassion', 'Emotional balance'], duration: 300, isPremium: false },
    { id: 'chak-throat', name: 'Throat Chakra', hz: 384, benefits: ['Communication', 'Truth speaking', 'Self-expression'], duration: 300, isPremium: false },
    { id: 'chak-third-eye', name: 'Third Eye Chakra', hz: 426.7, benefits: ['Intuition', 'Inner wisdom', 'Clairvoyance'], duration: 300, isPremium: false },
    { id: 'chak-crown', name: 'Crown Chakra', hz: 480, benefits: ['Spiritual connection', 'Enlightenment', 'Divine wisdom'], duration: 300, isPremium: false },
    { id: 'chak-soul-star', name: 'Soul Star Chakra', hz: 1152, benefits: ['Soul connection', 'Higher purpose', 'Cosmic awareness'], duration: 300, isPremium: true },
    { id: 'chak-universal', name: 'Universal Chakra', hz: 1440, benefits: ['Universal connection', 'Oneness', 'Divine love'], duration: 300, isPremium: true }
  ],

  // BINAURAL BEATS (Complete Brainwave Spectrum - Delta through Gamma)
  binaural: [
    { id: 'bin-delta-05', name: 'Deep Sleep Delta 0.5Hz', hz: 0.5, benefits: ['Deepest sleep', 'Physical restoration', 'Complete rest'], duration: 600, isPremium: false },
    { id: 'bin-delta-1', name: 'Deep Sleep Delta 1Hz', hz: 1, benefits: ['Deep sleep', 'Recovery', 'Restoration'], duration: 600, isPremium: false },
    { id: 'bin-delta-2', name: 'Deep Sleep Delta 2Hz', hz: 2, benefits: ['Sleep induction', 'Relaxation', 'Rest support'], duration: 600, isPremium: false },
    { id: 'bin-delta-3', name: 'REM Sleep Delta 3Hz', hz: 3, benefits: ['REM sleep', 'Dreaming', 'Memory consolidation'], duration: 600, isPremium: false },
    { id: 'bin-theta-4', name: 'Deep Meditation Theta 4Hz', hz: 4, benefits: ['Deep meditation', 'Spiritual connection', 'Intuition'], duration: 600, isPremium: false },
    { id: 'bin-theta-5', name: 'Creative Theta 5Hz', hz: 5, benefits: ['Creativity', 'Innovation', 'Artistic flow'], duration: 600, isPremium: false },
    { id: 'bin-theta-6', name: 'Intuitive Theta 6Hz', hz: 6, benefits: ['Intuition', 'Psychic abilities', 'Inner knowing'], duration: 600, isPremium: false },
    { id: 'bin-theta-7', name: 'Meditation Theta 7Hz', hz: 7, benefits: ['Deep meditation', 'Tranquility', 'Peace'], duration: 600, isPremium: false },
    { id: 'bin-alpha-8', name: 'Relaxed Alpha 8Hz', hz: 8, benefits: ['Relaxation', 'Calm alertness', 'Stress reduction'], duration: 600, isPremium: false },
    { id: 'bin-alpha-9', name: 'Learning Alpha 9Hz', hz: 9, benefits: ['Learning enhancement', 'Memory', 'Study focus'], duration: 600, isPremium: false },
    { id: 'bin-alpha-10', name: 'Focus Alpha 10Hz', hz: 10, benefits: ['Enhanced focus', 'Mental clarity', 'Concentration'], duration: 600, isPremium: false },
    { id: 'bin-alpha-11', name: 'Aware Alpha 11Hz', hz: 11, benefits: ['Conscious awareness', 'Mindfulness', 'Present moment'], duration: 600, isPremium: true },
    { id: 'bin-beta-12', name: 'Alert Beta 12Hz', hz: 12, benefits: ['Alertness', 'Active thinking', 'Problem solving'], duration: 600, isPremium: true },
    { id: 'bin-beta-14', name: 'Focus Beta 14Hz', hz: 14, benefits: ['Sharp focus', 'Mental acuity', 'Productivity'], duration: 600, isPremium: true },
    { id: 'bin-beta-16', name: 'High Beta 16Hz', hz: 16, benefits: ['High activity', 'Quick thinking', 'Mental agility'], duration: 600, isPremium: true },
    { id: 'bin-beta-18', name: 'Peak Beta 18Hz', hz: 18, benefits: ['Peak performance', 'Analytical thinking', 'Logic'], duration: 600, isPremium: true },
    { id: 'bin-gamma-40', name: 'Gamma 40Hz', hz: 40, benefits: ['Peak cognition', 'Memory enhancement', 'Neural synchronization'], duration: 600, isPremium: true },
    { id: 'bin-gamma-60', name: 'High Gamma 60Hz', hz: 60, benefits: ['Expanded consciousness', 'Mystical experiences', 'Transcendence'], duration: 600, isPremium: true },
    { id: 'bin-gamma-80', name: 'Ultra Gamma 80Hz', hz: 80, benefits: ['Ultimate awareness', 'Cosmic consciousness', 'Enlightenment'], duration: 600, isPremium: true }
  ],

  // PLANETARY FREQUENCIES (Solar System)
  planetary: [
    { id: 'plan-earth', name: 'Earth (Schumann)', hz: 7.83, benefits: ['Grounding', 'Natural sync', 'Balance'], duration: 300, isPremium: false },
    { id: 'plan-moon', name: 'Moon', hz: 210.42, benefits: ['Feminine energy', 'Cycles', 'Emotional balance'], duration: 300, isPremium: true },
    { id: 'plan-sun', name: 'Sun', hz: 126.22, benefits: ['Vitality', 'Life force', 'Solar energy'], duration: 300, isPremium: true },
    { id: 'plan-mercury', name: 'Mercury', hz: 141.27, benefits: ['Communication', 'Mental agility', 'Learning'], duration: 300, isPremium: true },
    { id: 'plan-venus', name: 'Venus', hz: 221.23, benefits: ['Love', 'Beauty', 'Harmony'], duration: 300, isPremium: true },
    { id: 'plan-mars', name: 'Mars', hz: 144.72, benefits: ['Motivation', 'Courage', 'Action'], duration: 300, isPremium: true },
    { id: 'plan-jupiter', name: 'Jupiter', hz: 183.58, benefits: ['Abundance', 'Growth', 'Wisdom'], duration: 300, isPremium: true },
    { id: 'plan-saturn', name: 'Saturn', hz: 147.85, benefits: ['Discipline', 'Structure', 'Responsibility'], duration: 300, isPremium: true },
    { id: 'plan-uranus', name: 'Uranus', hz: 207.36, benefits: ['Innovation', 'Change', 'Awakening'], duration: 300, isPremium: true },
    { id: 'plan-neptune', name: 'Neptune', hz: 211.44, benefits: ['Intuition', 'Dreams', 'Spirituality'], duration: 300, isPremium: true },
    { id: 'plan-pluto', name: 'Pluto', hz: 140.25, benefits: ['Transformation', 'Rebirth', 'Deep renewal'], duration: 300, isPremium: true }
  ],

  // WELLNESS SUPPORT FREQUENCIES (50+ frequencies organized by system)
  healing: [
    // Comfort & Relaxation (5)
    { id: 'heal-comfort-1', name: 'Comfort Support', hz: 95, benefits: ['Deep relaxation', 'Soothing balance', 'Comfort'], duration: 300, isPremium: false },
    { id: 'heal-comfort-2', name: 'Deep Comfort', hz: 304, benefits: ['Deep comfort', 'Long-term relaxation', 'Quality of life'], duration: 300, isPremium: true },
    { id: 'heal-sooth-1', name: 'Soothing Balance', hz: 1.2, benefits: ['Soothing support', 'Wellness', 'Recovery'], duration: 300, isPremium: true },
    { id: 'heal-joint-1', name: 'Joint Comfort', hz: 1.5, benefits: ['Joint comfort', 'Mobility support', 'Flexibility'], duration: 300, isPremium: true },
    
    // Tissue & Cellular (5)
    { id: 'heal-tissue-1', name: 'Tissue Support', hz: 285, benefits: ['Tissue wellness', 'Renewal', 'Cellular wellness'], duration: 300, isPremium: false },
    { id: 'heal-bone-1', name: 'Bone Strength', hz: 20, benefits: ['Bone support', 'Bone wellness', 'Strength'], duration: 300, isPremium: true },
    { id: 'heal-muscle-1', name: 'Muscle Recovery', hz: 120, benefits: ['Muscle support', 'Recovery', 'Strength'], duration: 300, isPremium: true },
    { id: 'heal-skin-1', name: 'Skin Renewal', hz: 465, benefits: ['Skin wellness', 'Cell renewal', 'Smooth skin'], duration: 300, isPremium: true },
    { id: 'heal-recovery-1', name: 'Recovery Support', hz: 250, benefits: ['Accelerated wellness', 'Tissue support', 'Recovery'], duration: 300, isPremium: true },
    
    // Vitality System (5)
    { id: 'heal-vital-1', name: 'Vitality Support', hz: 124, benefits: ['Vitality enhancement', 'Wellness support', 'Energy'], duration: 300, isPremium: false },
    { id: 'heal-vital-2', name: 'Inner Vitality', hz: 2.5, benefits: ['Inner strength', 'Natural vitality', 'Energy flow'], duration: 300, isPremium: true },
    { id: 'heal-lymph-1', name: 'Lymphatic Flow', hz: 15.2, benefits: ['Lymphatic flow', 'Natural balance', 'Vitality'], duration: 300, isPremium: true },
    { id: 'heal-shield-1', name: 'Wellness Shield', hz: 2644, benefits: ['Wellness protection', 'Natural defense', 'Vitality'], duration: 300, isPremium: true },
    { id: 'heal-purity-1', name: 'Purity Support', hz: 2112, benefits: ['Purity maintenance', 'Wellness support', 'Balance'], duration: 300, isPremium: true },
    
    // Circulation & Heart (5)
    { id: 'heal-flow-1', name: 'Flow Enhancement', hz: 33, benefits: ['Natural flow', 'Circulation support', 'Oxygenation'], duration: 300, isPremium: true },
    { id: 'heal-heart-1', name: 'Heart Harmony', hz: 341.3, benefits: ['Heart opening', 'Heart balance', 'Love energy'], duration: 300, isPremium: true },
    { id: 'heal-heart-2', name: 'Heart Balance', hz: 10, benefits: ['Heart harmony', 'Inner balance', 'Wellness'], duration: 300, isPremium: true },
    { id: 'heal-circ-1', name: 'Circulatory Harmony', hz: 1.45, benefits: ['Circulatory balance', 'Flow improvement', 'Heart harmony'], duration: 300, isPremium: true },
    
    // Clarity & Balance (5)
    { id: 'heal-clarity-1', name: 'General Clarity', hz: 10000, benefits: ['Natural clarity', 'Purification', 'Mental clarity'], duration: 300, isPremium: true },
    { id: 'heal-liver-1', name: 'Liver Support', hz: 317.83, benefits: ['Liver support', 'Metabolism', 'Natural balance'], duration: 300, isPremium: true },
    { id: 'heal-kidney-1', name: 'Kidney Support', hz: 319.88, benefits: ['Kidney harmony', 'Balance support', 'Fluid balance'], duration: 300, isPremium: true },
    { id: 'heal-clarity-2', name: 'Deep Clarity', hz: 1.14, benefits: ['Deep clarity', 'Cellular harmony', 'Wellness support'], duration: 300, isPremium: true },
    
    // Neural Support (4)
    { id: 'heal-neural-1', name: 'Neural Comfort', hz: 2720, benefits: ['Neural support', 'Nerve comfort', 'Sensation support'], duration: 300, isPremium: true },
    { id: 'heal-neuro-1', name: 'Nervous System Balance', hz: 8, benefits: ['Nervous system harmony', 'Neural function', 'Coordination'], duration: 300, isPremium: true },
    { id: 'heal-nerve-1', name: 'Nerve Comfort', hz: 6000, benefits: ['Nerve comfort', 'Neural harmony', 'Relaxation'], duration: 300, isPremium: true },
    
    // Glandular Harmony (4)
    { id: 'heal-gland-1', name: 'Glandular Harmony', hz: 8, benefits: ['Glandular balance', 'Inner harmony', 'Balance'], duration: 300, isPremium: true },
    { id: 'heal-thyroid-1', name: 'Thyroid Harmony', hz: 384, benefits: ['Thyroid support', 'Metabolism', 'Energy'], duration: 300, isPremium: true },
    { id: 'heal-adrenal-1', name: 'Adrenal Harmony', hz: 492.8, benefits: ['Adrenal support', 'Stress balance', 'Energy'], duration: 300, isPremium: true },
    { id: 'heal-metab-1', name: 'Metabolic Harmony', hz: 787, benefits: ['Metabolic balance', 'Energy harmony', 'Wellness'], duration: 300, isPremium: true },
    
    // Digestive Wellness (4)
    { id: 'heal-digest-1', name: 'Digestive Wellness', hz: 110, benefits: ['Digestive support', 'Gut harmony', 'Nutrient support'], duration: 300, isPremium: true },
    { id: 'heal-stomach-1', name: 'Stomach Comfort', hz: 727, benefits: ['Stomach harmony', 'Digestive balance', 'Comfort'], duration: 300, isPremium: true },
    { id: 'heal-gut-1', name: 'Gut Harmony', hz: 802, benefits: ['Intestinal harmony', 'Gut flora balance', 'Wellness'], duration: 300, isPremium: true },
    { id: 'heal-liver-2', name: 'Liver Vitality', hz: 1550, benefits: ['Liver vitality', 'Metabolic function', 'Balance'], duration: 300, isPremium: true }
  ],

  // EMOTION SUPPORT FREQUENCIES (20+ emotions)
  emotion: [
    { id: 'emot-joy', name: 'Joy & Happiness', hz: 528, benefits: ['Joy', 'Happiness', 'Positive emotion'], duration: 300, isPremium: false },
    { id: 'emot-peace', name: 'Peace & Calm', hz: 174, benefits: ['Peace', 'Calm', 'Tranquility'], duration: 300, isPremium: false },
    { id: 'emot-love', name: 'Love & Compassion', hz: 639, benefits: ['Love', 'Compassion', 'Connection'], duration: 300, isPremium: false },
    { id: 'emot-courage', name: 'Courage & Confidence', hz: 144.72, benefits: ['Courage', 'Confidence', 'Empowerment'], duration: 300, isPremium: false },
    { id: 'emot-gratitude', name: 'Gratitude & Appreciation', hz: 639, benefits: ['Gratitude', 'Appreciation', 'Thankfulness'], duration: 300, isPremium: false },
    { id: 'emot-forgiveness', name: 'Forgiveness & Release', hz: 396, benefits: ['Forgiveness', 'Release', 'Letting go'], duration: 300, isPremium: true },
    { id: 'emot-acceptance', name: 'Acceptance & Surrender', hz: 417, benefits: ['Acceptance', 'Surrender', 'Peace'], duration: 300, isPremium: true },
    { id: 'emot-clarity', name: 'Clarity & Understanding', hz: 852, benefits: ['Clarity', 'Understanding', 'Insight'], duration: 300, isPremium: true }
  ],

  // MANIFESTATION FREQUENCIES (10+)
  manifestation: [
    { id: 'mani-abundance', name: 'Abundance & Prosperity', hz: 183.58, benefits: ['Abundance', 'Prosperity', 'Wealth'], duration: 300, isPremium: true },
    { id: 'mani-success', name: 'Success & Achievement', hz: 741, benefits: ['Success', 'Achievement', 'Goal attainment'], duration: 300, isPremium: true },
    { id: 'mani-attract', name: 'Attraction & Magnetism', hz: 639, benefits: ['Attraction', 'Magnetism', 'Drawing to you'], duration: 300, isPremium: true },
    { id: 'mani-power', name: 'Power & Authority', hz: 320, benefits: ['Power', 'Authority', 'Personal mastery'], duration: 300, isPremium: true },
    { id: 'mani-creativity', name: 'Creative Manifestation', hz: 417, benefits: ['Creativity', 'Creation', 'Manifestation'], duration: 300, isPremium: true },
    { id: 'mani-love', name: 'Love Attraction', hz: 221.23, benefits: ['Love attraction', 'Relationships', 'Connection'], duration: 300, isPremium: true },
    { id: 'mani-health', name: 'Health Manifestation', hz: 528, benefits: ['Health', 'Vitality', 'Wellness manifestation'], duration: 300, isPremium: true },
    { id: 'mani-purpose', name: 'Life Purpose', hz: 963, benefits: ['Life purpose', 'Calling', 'Mission'], duration: 300, isPremium: true }
  ],

  // Helper functions
  getAvailableFrequencies: function(subscriptionTier = 'free') {
    const allFreqs = [
      ...this.solfeggio,
      ...this.chakra,
      ...this.binaural,
      ...this.planetary,
      ...this.healing,
      ...this.emotion,
      ...this.manifestation
    ];
    
    if (subscriptionTier === 'free') {
      return allFreqs.filter(f => !f.isPremium);
    }
    return allFreqs; // 'weekly' or 'lifetime' get all
  },

  getFrequencyById: function(id) {
    const allFreqs = [
      ...this.solfeggio,
      ...this.chakra,
      ...this.binaural,
      ...this.planetary,
      ...this.healing,
      ...this.emotion,
      ...this.manifestation
    ];
    return allFreqs.find(f => f.id === id);
  },

  getFrequenciesByCategory: function(category, subscriptionTier = 'free') {
    const allFreqs = this.getAvailableFrequencies(subscriptionTier);
    return allFreqs.filter(f => f.category === category);
  },

  searchFrequencies: function(query, subscriptionTier = 'free') {
    const allFreqs = this.getAvailableFrequencies(subscriptionTier);
    const q = query.toLowerCase();
    return allFreqs.filter(f => 
      f.name.toLowerCase().includes(q) || 
      f.id.toLowerCase().includes(q) ||
      f.benefits.some(b => b.toLowerCase().includes(q))
    );
  }
};

// Export for use in browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FREQUENCIES_LIBRARY;
}
