// frequency-player.js - Web Audio API frequency player
// Generates and plays healing frequencies using Web Audio API

const FrequencyPlayer = {
  audioContext: null,
  oscillators: [],
  gainNodes: [],
  isPlaying: false,
  currentFrequencies: [],
  masterGain: null,

  // Initialize Web Audio API
  init: function() {
    if (!this.audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.3; // Moderate volume
      console.log('✅ FrequencyPlayer initialized');
      console.log('Sample rate:', this.audioContext.sampleRate, 'Hz');
    }
  },

  // Set volume (0-1)
  setVolume: function(value) {
    if (!this.audioContext) this.init();
    value = Math.max(0, Math.min(1, value));
    this.masterGain.gain.setValueAtTime(value * 0.3, this.audioContext.currentTime);
    console.log('🔊 Volume set to:', (value * 100).toFixed(0) + '%');
  },

  // Play single frequency
  playFrequency: function(frequency, duration = 300) {
    if (!this.audioContext) this.init();

    // Resume audio context if suspended (required by browsers)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    // Stop any existing playback
    if (this.isPlaying) {
      this.stop();
    }

    try {
      console.log(`🎵 Playing ${frequency}Hz for ${duration}ms`);

      // Create oscillator
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);

      // Set up gain envelope (smooth fade in/out)
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(1, now + 0.1); // Fade in
      gainNode.gain.linearRampToValueAtTime(0, now + duration / 1000 - 0.1); // Fade out

      oscillator.start(now);
      oscillator.stop(now + duration / 1000);

      this.oscillators.push(oscillator);
      this.gainNodes.push(gainNode);
      this.currentFrequencies = [frequency];
      this.isPlaying = true;

      // Auto-stop after duration
      setTimeout(() => {
        if (this.isPlaying && this.oscillators.length === 1) {
          this.stop();
        }
      }, duration + 200);

      return true;
    } catch (err) {
      console.error('Error playing frequency:', err);
      return false;
    }
  },

  // Play multiple frequencies (layered/binaural)
  playFrequencies: function(frequencies, duration = 300, mode = 'binaural') {
    if (!this.audioContext) this.init();

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    // Stop existing playback
    if (this.isPlaying) {
      this.stop();
    }

    try {
      console.log(`🎵 Playing ${frequencies.length} frequencies (${mode}): ${frequencies.join(', ')}Hz`);

      const now = this.audioContext.currentTime;
      const durationSeconds = duration / 1000;

      frequencies.forEach((freq, index) => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = freq;

        // For binaural beats with very low frequencies
        if (mode === 'binaural' && freq < 100) {
          // Create binaural beat by splitting frequency between channels
          // Left: base frequency, Right: base + beat frequency
          // Note: Web Audio API is mono by default, so we'll layer them
        }

        // Connect
        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        // Envelope
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(1 / frequencies.length, now + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, now + durationSeconds - 0.1);

        oscillator.start(now);
        oscillator.stop(now + durationSeconds);

        this.oscillators.push(oscillator);
        this.gainNodes.push(gainNode);
      });

      this.currentFrequencies = frequencies;
      this.isPlaying = true;

      // Auto-stop after duration
      setTimeout(() => {
        if (this.isPlaying) {
          this.stop();
        }
      }, duration + 200);

      return true;
    } catch (err) {
      console.error('Error playing frequencies:', err);
      return false;
    }
  },

  // Play smart stack
  playStack: function(stack, duration = null) {
    if (!stack || !stack.frequencies) {
      console.error('Invalid stack');
      return false;
    }

    const playDuration = duration || stack.duration || 1200;
    console.log(`🎼 Playing stack: ${stack.name}`);
    return this.playFrequencies(stack.frequencies, playDuration, 'layered');
  },

  // Stop playback
  stop: function() {
    try {
      this.oscillators.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Already stopped
        }
      });

      this.oscillators = [];
      this.gainNodes = [];
      this.isPlaying = false;
      this.currentFrequencies = [];
      console.log('⏹️ Playback stopped');
      return true;
    } catch (err) {
      console.error('Error stopping playback:', err);
      return false;
    }
  },

  // Pause playback (can resume with different sound)
  pause: function() {
    if (this.audioContext) {
      this.audioContext.suspend();
      console.log('⏸️ Playback paused');
      return true;
    }
    return false;
  },

  // Resume playback
  resume: function() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
      console.log('▶️ Playback resumed');
      return true;
    }
    return false;
  },

  // Check if audio is playing
  isAudioPlaying: function() {
    return this.isPlaying;
  },

  // Get current playing frequencies
  getCurrentFrequencies: function() {
    return this.currentFrequencies;
  },

  // Generate tone visualization data (for UI)
  getVisualizationData: function() {
    if (!this.audioContext) return null;

    const analyser = this.audioContext.createAnalyser();
    this.masterGain.connect(analyser);
    analyser.fftSize = 2048;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    return dataArray;
  },

  // Play frequency for specified duration with volume control
  playTone: function(config) {
    config = config || {};
    const frequency = config.frequency || 432;
    const duration = config.duration || 5000;
    const volume = config.volume || 0.5;
    const waveform = config.waveform || 'sine'; // sine, triangle, square, sawtooth

    if (!this.audioContext) this.init();

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.type = waveform;
      oscillator.frequency.value = frequency;

      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);

      const now = this.audioContext.currentTime;
      const durationSec = duration / 1000;

      // Envelope
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(volume, now + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, now + durationSec - 0.1);

      oscillator.start(now);
      oscillator.stop(now + durationSec);

      console.log(`🎵 Playing ${frequency}Hz ${waveform} tone for ${duration}ms`);
      return true;
    } catch (err) {
      console.error('Error playing tone:', err);
      return false;
    }
  },

  // Create frequency sweep (ascending or descending)
  playSweep: function(startFreq, endFreq, duration = 5000) {
    if (!this.audioContext) this.init();

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);

      const now = this.audioContext.currentTime;
      const durationSec = duration / 1000;

      // Frequency sweep
      oscillator.frequency.setValueAtTime(startFreq, now);
      oscillator.frequency.exponentialRampToValueAtTime(endFreq, now + durationSec);

      // Volume envelope
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(1, now + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, now + durationSec - 0.1);

      oscillator.start(now);
      oscillator.stop(now + durationSec);

      console.log(`🎵 Sweep: ${startFreq}Hz → ${endFreq}Hz over ${duration}ms`);
      return true;
    } catch (err) {
      console.error('Error playing sweep:', err);
      return false;
    }
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FrequencyPlayer;
}
