/**
 * MANIFESTATION ENGINE
 * Handles intention setting, session tracking, achievements, and stats
 */

// Achievement definitions
const ACHIEVEMENTS = [
  {
    id: 'first-intention',
    name: 'Intention Initiate',
    description: 'Set your first manifestation target',
    icon: '✨',
    check: (stats, intentions) => intentions > 0
  },
  {
    id: 'session-5',
    name: 'Momentum Builder',
    description: 'Complete 5 manifestation sessions',
    icon: '⚡',
    check: (stats) => stats.sessions >= 5
  },
  {
    id: 'streak-3',
    name: 'Consistency Alchemist',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    check: (stats) => stats.streak >= 3
  },
  {
    id: 'minutes-120',
    name: 'Time Investor',
    description: 'Spend 120 mindful minutes',
    icon: '⏱️',
    check: (stats) => stats.minutes >= 120
  },
  {
    id: 'session-25',
    name: 'Master Manifestor',
    description: 'Complete 25 sessions',
    icon: '👑',
    check: (stats) => stats.sessions >= 25
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: '7-day manifestation streak',
    icon: '💫',
    check: (stats) => stats.streak >= 7
  }
];

// Category-specific frequency recommendations
const CATEGORY_RECOMMENDATIONS = {
  abundance: ['528Hz DNA Harmony', '888 Infinite Abundance', '183.58Hz Jupiter Abundance'],
  love: ['639Hz Heart Connection', '528Hz Love Frequency', '350Hz Rose Quartz Love'],
  health: ['285Hz Tissue Support', '528Hz Cellular Vitality', '741Hz DNA Expression'],
  career: ['40Hz Gamma Focus', '741Hz Expression', '852Hz Success Programming'],
  spiritual: ['963Hz Divine Connection', '852Hz Spiritual Order', '136.1Hz Om Vibration'],
  creativity: ['417Hz Creativity', '6Hz Theta Creative', '741Hz Expression']
};

// State management
let currentState = {
  currentIntention: null,
  stats: { sessions: 0, minutes: 0, streak: 0, intentions: 0 },
  achievements: {},
  lastSessionDate: null,
  isSessionActive: false,
  sessionStartTime: null,
  elapsedSeconds: 0,
  isPaused: false
};

let timerInterval = null;
let selectedCategory = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateStats();
  updateAchievements();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Category selection
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      selectCategory(category);
    });
  });

  // Intensity slider
  document.getElementById('intention-intensity').addEventListener('input', (e) => {
    document.getElementById('intensity-display').textContent = e.target.value;
  });
}

// Category selection
function selectCategory(category) {
  selectedCategory = category;
  
  // Update UI
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-category="${category}"]`).classList.add('active');
  
  // Show recommendations
  const recommendationsDiv = document.getElementById('recommendations');
  const frequenciesDiv = document.getElementById('recommended-frequencies');
  
  recommendationsDiv.style.display = 'block';
  frequenciesDiv.innerHTML = '';
  
  const frequencies = CATEGORY_RECOMMENDATIONS[category] || [];
  frequencies.forEach(freq => {
    const chip = document.createElement('span');
    chip.className = 'frequency-chip';
    chip.textContent = freq;
    chip.onclick = () => {
      // TODO: Play this frequency
      console.log('Playing frequency:', freq);
    };
    frequenciesDiv.appendChild(chip);
  });
}

// Save intention and start session
function saveIntention() {
  const title = document.getElementById('intention-title').value.trim();
  const description = document.getElementById('intention-description').value.trim();
  const intensity = parseInt(document.getElementById('intention-intensity').value);
  
  if (!title) {
    alert('Please enter an intention title');
    return;
  }
  
  if (!selectedCategory) {
    alert('Please select a category');
    return;
  }
  
  // Save intention
  currentState.currentIntention = {
    title,
    category: selectedCategory,
    description,
    intensity,
    updatedAt: new Date().toISOString()
  };
  
  currentState.stats.intentions++;
  saveState();
  
  // Start session
  startSession();
}

// Start manifestation session
function startSession() {
  currentState.isSessionActive = true;
  currentState.sessionStartTime = Date.now();
  currentState.elapsedSeconds = 0;
  currentState.isPaused = false;
  
  // Update UI
  document.getElementById('intention-form').style.display = 'none';
  document.getElementById('session-area').style.display = 'block';
  
  // Show current intention
  const intentionDisplay = document.getElementById('current-intention-display');
  intentionDisplay.innerHTML = `
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
      <h3 style="margin: 0 0 0.5rem 0;">${currentState.currentIntention.title}</h3>
      <p style="color: var(--text-secondary); margin: 0;">${currentState.currentIntention.category} · Intensity: ${currentState.currentIntention.intensity}/10</p>
    </div>
  `;
  
  // Start timer
  startTimer();
}

// Timer management
function startTimer() {
  timerInterval = setInterval(() => {
    if (!currentState.isPaused) {
      currentState.elapsedSeconds++;
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(currentState.elapsedSeconds / 60);
  const seconds = currentState.elapsedSeconds % 60;
  document.getElementById('timer').textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function togglePause() {
  currentState.isPaused = !currentState.isPaused;
  const pauseBtn = document.getElementById('pause-btn');
  pauseBtn.textContent = currentState.isPaused ? '▶️ Resume' : '⏸️ Pause';
}

// End session
function endSession() {
  if (currentState.elapsedSeconds < 60) {
    if (!confirm('Session is less than 1 minute. End anyway?')) {
      return;
    }
  }
  
  // Stop timer
  clearInterval(timerInterval);
  
  // Update stats
  currentState.stats.sessions++;
  currentState.stats.minutes += Math.floor(currentState.elapsedSeconds / 60);
  
  // Update streak
  const today = new Date().toDateString();
  const lastDate = currentState.lastSessionDate ? new Date(currentState.lastSessionDate).toDateString() : null;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  if (lastDate === yesterday) {
    currentState.stats.streak++;
  } else if (lastDate !== today) {
    currentState.stats.streak = 1;
  }
  
  currentState.lastSessionDate = new Date().toISOString();
  currentState.isSessionActive = false;
  
  saveState();
  
  // Show completion message
  alert(`🎉 Session Complete!\n\n${Math.floor(currentState.elapsedSeconds / 60)} minutes of focused manifestation.\n\nYour intention has been energized!`);
  
  // Reset UI
  document.getElementById('session-area').style.display = 'none';
  document.getElementById('intention-form').style.display = 'block';
  document.getElementById('intention-title').value = '';
  document.getElementById('intention-description').value = '';
  document.getElementById('intention-intensity').value = '5';
  document.getElementById('intensity-display').textContent = '5';
  document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('recommendations').style.display = 'none';
  selectedCategory = null;
  
  // Update UI
  updateStats();
  updateAchievements();
}

// Update stats display
function updateStats() {
  document.getElementById('stat-sessions').textContent = currentState.stats.sessions;
  document.getElementById('stat-minutes').textContent = currentState.stats.minutes;
  document.getElementById('stat-streak').textContent = currentState.stats.streak;
  document.getElementById('stat-intentions').textContent = currentState.stats.intentions;
}

// Update achievements
function updateAchievements() {
  const achievementsDiv = document.getElementById('achievements');
  achievementsDiv.innerHTML = '';
  
  ACHIEVEMENTS.forEach(achievement => {
    const isUnlocked = achievement.check(currentState.stats, currentState.stats.intentions);
    
    if (isUnlocked && !currentState.achievements[achievement.id]) {
      currentState.achievements[achievement.id] = true;
      saveState();
      // Show unlock notification
      setTimeout(() => {
        alert(`🏆 Achievement Unlocked!\n\n${achievement.icon} ${achievement.name}\n${achievement.description}`);
      }, 500);
    }
    
    const card = document.createElement('div');
    card.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;
    card.innerHTML = `
      <div class="icon">${achievement.icon}</div>
      <div class="name">${achievement.name}</div>
      <div class="description">${achievement.description}</div>
    `;
    achievementsDiv.appendChild(card);
  });
}

// State persistence
function saveState() {
  localStorage.setItem('manifestation_state', JSON.stringify(currentState));
  
  // Also try to sync with Supabase if available
  syncWithSupabase();
}

function loadState() {
  const saved = localStorage.getItem('manifestation_state');
  if (saved) {
    try {
      currentState = JSON.parse(saved);
    } catch (error) {
      console.error('Failed to load state:', error);
    }
  }
}

async function syncWithSupabase() {
  try {
    if (!window.supabase || !window.ENV) return;
    
    const SUPABASE_URL = window.ENV?.SUPABASE_URL;
    const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY;
    
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
    
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;
    
    // Save to manifestation_profiles table
    await supabase
      .from('manifestation_profiles')
      .upsert({
        user_id: user.id,
        current_intention: currentState.currentIntention,
        stats: currentState.stats,
        achievements: currentState.achievements,
        last_session_date: currentState.lastSessionDate,
        updated_at: new Date().toISOString()
      });
  } catch (error) {
    console.log('Supabase sync failed (offline mode):', error.message);
  }
}

// Export for use in other scripts
window.manifestationEngine = {
  saveIntention,
  startSession,
  endSession,
  togglePause,
  selectCategory,
  getState: () => currentState,
  updateStats,
  updateAchievements
};

console.log('✨ Manifestation Engine loaded');
