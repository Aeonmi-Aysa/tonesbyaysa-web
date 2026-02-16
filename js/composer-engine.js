/**
 * FREQUENCY COMPOSER ENGINE
 * Multi-layer frequency bath creation system
 */

// Sample frequency library (will be replaced with complete library later)
const SAMPLE_FREQUENCIES = [
  { id: '1', name: 'Liberation from Fear', hz: 174, category: 'solfeggio' },
  { id: '2', name: 'Tissue Harmony', hz: 285, category: 'solfeggio' },
  { id: '3', name: 'Liberation from Guilt', hz: 396, category: 'solfeggio' },
  { id: '4', name: 'Facilitating Change', hz: 417, category: 'solfeggio' },
  { id: '5', name: 'Love & DNA Harmony', hz: 528, category: 'solfeggio' },
  { id: '6', name: 'Relationships', hz: 639, category: 'solfeggio' },
  { id: '7', name: 'Awakening Intuition', hz: 741, category: 'solfeggio' },
  { id: '8', name: 'Spiritual Order', hz: 852, category: 'solfeggio' },
  { id: '9', name: 'Divine Connection', hz: 963, category: 'solfeggio' },
  { id: '10', name: 'Root Chakra', hz: 256, category: 'chakra' },
  { id: '11', name: 'Sacral Chakra', hz: 288, category: 'chakra' },
  { id: '12', name: 'Solar Plexus Chakra', hz: 320, category: 'chakra' },
  { id: '13', name: 'Heart Chakra', hz: 341.3, category: 'chakra' },
  { id: '14', name: 'Throat Chakra', hz: 384, category: 'chakra' },
  { id: '15', name: 'Third Eye Chakra', hz: 426.7, category: 'chakra' },
  { id: '16', name: 'Crown Chakra', hz: 480, category: 'chakra' },
  { id: '17', name: 'Deep Sleep Delta 0.5Hz', hz: 0.5, category: 'binaural' },
  { id: '18', name: 'Deep Sleep Delta 1Hz', hz: 1, category: 'binaural' },
  { id: '19', name: 'REM Sleep Delta 3Hz', hz: 3, category: 'binaural' },
  { id: '20', name: 'Deep Meditation Theta 4Hz', hz: 4, category: 'binaural' },
  { id: '21', name: 'Creative Theta 5Hz', hz: 5, category: 'binaural' },
  { id: '22', name: 'Intuitive Theta 6Hz', hz: 6, category: 'binaural' },
  { id: '23', name: 'Meditation Theta 7Hz', hz: 7, category: 'binaural' },
  { id: '24', name: 'Relaxed Alpha 8Hz', hz: 8, category: 'binaural' },
  { id: '25', name: 'Focus Alpha 10Hz', hz: 10, category: 'binaural' },
  { id: '26', name: 'Alert Beta 12Hz', hz: 12, category: 'binaural' },
  { id: '27', name: 'Focus Beta 14Hz', hz: 14, category: 'binaural' },
  { id: '28', name: 'Gamma 40Hz', hz: 40, category: 'binaural' },
  { id: '29', name: 'Earth (Schumann)', hz: 7.83, category: 'planetary' },
  { id: '30', name: 'Sun', hz: 126.22, category: 'planetary' }
];

const MAX_LAYERS = 6;
const WAVEFORMS = ['sine', 'square', 'triangle', 'sawtooth'];

// State
let layers = [];
let playMode = 'blend';
let savedBaths = [];
let audioContexts = [];
let isPlaying = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSavedBaths();
  updateUI();
  populateFrequencyPicker();
});

// Layer management
function addLayer(frequency) {
  if (layers.length >= MAX_LAYERS) {
    alert(`Maximum ${MAX_LAYERS} layers reached`);
    return;
  }

  const layer = {
    uid: Date.now().toString(),
    frequency,
    hz: frequency.hz,
    name: frequency.name,
    category: frequency.category,
    waveform: 'sine',
    duration: 300, // 5 minutes default
    volume: 50
  };

  layers.push(layer);
  updateUI();
  closeFrequencyPicker();
}

function removeLayer(uid) {
  layers = layers.filter(l => l.uid !== uid);
  updateUI();
}

function updateLayer(uid, field, value) {
  const layer = layers.find(l => l.uid === uid);
  if (layer) {
    layer[field] = value;
  }
}

function clearAllLayers() {
  if (layers.length === 0) return;
  
  if (confirm('Clear all layers?')) {
    stopBath();
    layers = [];
    updateUI();
  }
}

// UI updates
function updateUI() {
  updateLayersList();
  updateLayerCount();
  updateSavedBathsList();
}

function updateLayersList() {
  const layersList = document.getElementById('layers-list');
  
  if (layers.length === 0) {
    layersList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No layers yet. Click "Add Frequency Layer" to start.</p>';
    return;
  }

  layersList.innerHTML = layers.map(layer => `
    <div class="layer-card" data-uid="${layer.uid}">
      <div class="layer-header">
        <div class="layer-title">${layer.name}</div>
        <button class="layer-remove" onclick="removeLayer('${layer.uid}')">×</button>
      </div>
      <div class="layer-controls">
        <div class="layer-control">
          <label>Frequency</label>
          <input type="text" value="${layer.hz}Hz" disabled>
        </div>
        <div class="layer-control">
          <label>Waveform</label>
          <select onchange="updateLayer('${layer.uid}', 'waveform', this.value)">
            ${WAVEFORMS.map(w => `<option value="${w}" ${layer.waveform === w ? 'selected' : ''}>${w}</option>`).join('')}
          </select>
        </div>
        <div class="layer-control">
          <label>Duration (seconds)</label>
          <input type="number" value="${layer.duration}" min="10" max="3600" 
                 onchange="updateLayer('${layer.uid}', 'duration', parseInt(this.value))">
        </div>
        <div class="layer-control">
          <label>Volume (%)</label>
          <input type="range" value="${layer.volume}" min="10" max="100" 
                 oninput="updateLayer('${layer.uid}', 'volume', parseInt(this.value)); this.nextElementSibling.textContent = this.value + '%'">
          <span style="font-size: 0.75rem; color: var(--text-secondary);">${layer.volume}%</span>
        </div>
      </div>
    </div>
  `).join('');
}

function updateLayerCount() {
  document.getElementById('layer-count').textContent = layers.length;
}

// Play mode
function setPlayMode(mode) {
  playMode = mode;
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

// Audio playback
function playBath() {
  if (layers.length === 0) {
    alert('Add at least one frequency layer first');
    return;
  }

  stopBath(); // Stop any existing playback
  isPlaying = true;

  if (playMode === 'blend') {
    playBlendMode();
  } else {
    playSequenceMode();
  }
}

function playBlendMode() {
  layers.forEach(layer => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = layer.waveform;
    oscillator.frequency.setValueAtTime(layer.hz, audioContext.currentTime);
    gainNode.gain.setValueAtTime(layer.volume / 100, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + layer.duration);

    audioContexts.push({ context: audioContext, oscillator });
  });

  console.log(`🎵 Playing ${layers.length} layers in BLEND mode`);
}

function playSequenceMode() {
  let currentTime = 0;
  
  layers.forEach((layer, index) => {
    setTimeout(() => {
      if (!isPlaying) return;
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = layer.waveform;
      oscillator.frequency.setValueAtTime(layer.hz, audioContext.currentTime);
      gainNode.gain.setValueAtTime(layer.volume / 100, audioContext.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + layer.duration);

      audioContexts.push({ context: audioContext, oscillator });

      console.log(`🎵 Playing layer ${index + 1}/${layers.length}: ${layer.name}`);
    }, currentTime * 1000);

    currentTime += layer.duration;
  });

  console.log(`🎵 Playing ${layers.length} layers in SEQUENCE mode`);
}

function stopBath() {
  audioContexts.forEach(({ context, oscillator }) => {
    try {
      oscillator.stop();
      context.close();
    } catch (error) {
      // Already stopped
    }
  });
  
  audioContexts = [];
  isPlaying = false;
  console.log('⏹️ Playback stopped');
}

// Save/Load baths
function saveBath() {
  if (layers.length === 0) {
    alert('Add at least one layer before saving');
    return;
  }

  const name = document.getElementById('bath-name').value.trim() || 'Untitled Bath';
  
  const bath = {
    id: Date.now().toString(),
    name,
    mode: playMode,
    layers: JSON.parse(JSON.stringify(layers)),
    savedAt: new Date().toISOString(),
    isCustom: true
  };

  savedBaths.push(bath);
  localStorage.setItem('composer_baths', JSON.stringify(savedBaths));
  
  updateUI();
  alert(`✓ Bath saved as "${name}"`);
}

function loadBath(bathId) {
  const bath = savedBaths.find(b => b.id === bathId);
  if (!bath) return;

  stopBath();
  layers = JSON.parse(JSON.stringify(bath.layers));
  playMode = bath.mode;
  document.getElementById('bath-name').value = bath.name;
  
  setPlayMode(playMode);
  updateUI();
}

function deleteBath(bathId) {
  if (!confirm('Delete this bath?')) return;

  savedBaths = savedBaths.filter(b => b.id !== bathId);
  localStorage.setItem('composer_baths', JSON.stringify(savedBaths));
  updateUI();
}

function loadSavedBaths() {
  const saved = localStorage.getItem('composer_baths');
  if (saved) {
    try {
      savedBaths = JSON.parse(saved);
    } catch (error) {
      console.error('Failed to load saved baths:', error);
    }
  }
}

function updateSavedBathsList() {
  const listDiv = document.getElementById('saved-baths-list');
  
  if (savedBaths.length === 0) {
    listDiv.innerHTML = '<p style="font-size: 0.875rem; color: var(--text-secondary); text-align: center; padding: 1rem;">No saved baths yet</p>';
    return;
  }

  listDiv.innerHTML = savedBaths.map(bath => `
    <div class="saved-bath-item">
      <div class="bath-info" onclick="loadBath('${bath.id}')">
        <div class="bath-name">${bath.name}</div>
        <div class="bath-meta">${bath.layers.length} layers · ${bath.mode}</div>
      </div>
      <div class="bath-actions">
        <button class="bath-action-btn" onclick="loadBath('${bath.id}')" title="Load">📂</button>
        <button class="bath-action-btn" onclick="deleteBath('${bath.id}')" title="Delete">🗑️</button>
      </div>
    </div>
  `).join('');
}

// Frequency picker
function openFrequencyPicker() {
  if (layers.length >= MAX_LAYERS) {
    alert(`Maximum ${MAX_LAYERS} layers reached`);
    return;
  }
  
  document.getElementById('frequency-picker-modal').classList.add('active');
}

function closeFrequencyPicker() {
  document.getElementById('frequency-picker-modal').classList.remove('active');
  document.getElementById('frequency-search').value = '';
  populateFrequencyPicker();
}

function populateFrequencyPicker() {
  const listDiv = document.getElementById('frequency-list');
  
  listDiv.innerHTML = SAMPLE_FREQUENCIES.map(freq => `
    <div class="frequency-item" onclick='addLayer(${JSON.stringify(freq).replace(/'/g, "&apos;")})'>
      <div class="frequency-item-name">${freq.name}</div>
      <div class="frequency-item-hz">${freq.hz}Hz · ${freq.category}</div>
    </div>
  `).join('');
}

function filterFrequencies() {
  const search = document.getElementById('frequency-search').value.toLowerCase();
  const filtered = SAMPLE_FREQUENCIES.filter(freq => 
    freq.name.toLowerCase().includes(search) || 
    freq.hz.toString().includes(search) ||
    freq.category.toLowerCase().includes(search)
  );

  const listDiv = document.getElementById('frequency-list');
  listDiv.innerHTML = filtered.map(freq => `
    <div class="frequency-item" onclick='addLayer(${JSON.stringify(freq).replace(/'/g, "&apos;")})'>
      <div class="frequency-item-name">${freq.name}</div>
      <div class="frequency-item-hz">${freq.hz}Hz · ${freq.category}</div>
    </div>
  `).join('');
}

// Export functions for inline event handlers
window.addLayer = addLayer;
window.removeLayer = removeLayer;
window.updateLayer = updateLayer;
window.clearAllLayers = clearAllLayers;
window.setPlayMode = setPlayMode;
window.playBath = playBath;
window.stopBath = stopBath;
window.saveBath = saveBath;
window.loadBath = loadBath;
window.deleteBath = deleteBath;
window.openFrequencyPicker = openFrequencyPicker;
window.closeFrequencyPicker = closeFrequencyPicker;
window.filterFrequencies = filterFrequencies;

console.log('🎼 Composer Engine loaded');
