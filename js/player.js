// player.js - Audio player for HealTone frequencies (browser + Electron)

(function attachHealTonePlayer(windowObj) {
  if (!windowObj) {
    return;
  }

  class FrequencyPlayer {
    constructor() {
      this.audioContext = null;
      this.voices = [];
      this.timeoutId = null;
      this.isPlaying = false;
      this.currentFrequency = null;
      this.playbackStart = null;
      this.requestedDuration = null;
    }

    emitEvent(name, detail = {}) {
      if (!windowObj || typeof windowObj.dispatchEvent !== 'function') {
        return;
      }
      try {
        windowObj.dispatchEvent(new CustomEvent(name, { detail }));
      } catch (err) {
        /* swallow event errors */
      }
    }

    resolveWaveform(waveform) {
      if (!waveform) {
        return 'sine';
      }
      const value = String(waveform).toLowerCase();
      const allowed = ['sine', 'square', 'triangle', 'sawtooth'];
      if (allowed.includes(value)) {
        return value;
      }
      const mappings = {
        pulses: 'square',
        isochronic: 'square',
        bell: 'sine',
        'soft-bell': 'sine',
        drone: 'sine',
        pad: 'sine',
        choir: 'sine',
        flute: 'sine',
        'high-tone': 'triangle',
        'low-drone': 'sine',
        'tuning-fork': 'sine',
        instrument: 'sine',
        binaural: 'sine'
      };
      return mappings[value] || 'sine';
    }

    async init() {
      if (!this.audioContext) {
        this.audioContext = new (windowObj.AudioContext || windowObj.webkitAudioContext)();
      }
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    }

    async playFrequency(frequency, duration = null, waveform = 'sine') {
      return this.playFrequencies([frequency], duration, waveform);
    }

    async playFrequencies(frequencies, duration = null, waveforms = 'sine') {
      await this.init();
      this.stop();

      const list = (Array.isArray(frequencies) ? frequencies : [frequencies])
        .map(value => {
          const n = Number(value);
          if (!Number.isFinite(n)) return 0;
          // Clamp to WebAudio practical range to avoid oscillator warnings
          return Math.max(0.01, Math.min(20000, n));
        });
      const waveformList = Array.isArray(waveforms) ? waveforms : list.map(() => waveforms || 'sine');
      const now = this.audioContext.currentTime;
      const gainPerVoice = Math.min(0.12 / Math.max(list.length, 1), 0.12);
      const normalizedDuration = Number(duration);

      this.voices = list.map((freq, idx) =>
        this.createVoice(Number(freq), waveformList[idx % waveformList.length], gainPerVoice, now)
      );

      this.isPlaying = true;
      this.currentFrequency = list.length === 1 ? list[0] : list;
      this.playbackStart = Date.now();
      this.requestedDuration = Number.isFinite(normalizedDuration) && normalizedDuration > 0 ? normalizedDuration : null;

      this.emitEvent('healtone:player-start', {
        frequencies: this.currentFrequency,
        waveforms: waveformList,
        duration: this.requestedDuration
      });

      if (this.requestedDuration) {
        this.timeoutId = setTimeout(() => this.stop(), this.requestedDuration * 1000);
      }
    }

    createVoice(frequency, waveform, gainValue, timeReference) {
      if (frequency < 20) {
        return this.createBinauralVoice(Math.max(0.5, frequency), waveform, gainValue, timeReference);
      }
      return this.createStandardVoice(frequency, waveform, gainValue, timeReference);
    }

    createStandardVoice(frequency, waveform, gainValue, timeReference) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const normalized = this.resolveWaveform(waveform);

      // FIX: Clamp frequency to safe range before setting
      const clampedFreq = Math.max(0.01, Math.min(20000, frequency));
      osc.type = normalized;
      osc.frequency.setValueAtTime(clampedFreq, timeReference);

      gain.gain.setValueAtTime(0, timeReference);
      gain.gain.linearRampToValueAtTime(gainValue, timeReference + 0.12);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start();

      const voice = { oscillators: [osc], gainNodes: [gain] };

      if (frequency < 150) {
        const harmonicOsc = this.audioContext.createOscillator();
        const harmonicGain = this.audioContext.createGain();
        const harmonicFreq = Math.min(800, Math.max(120, frequency * 4));

        harmonicOsc.type = 'triangle';
        harmonicOsc.frequency.setValueAtTime(harmonicFreq, timeReference);
        harmonicGain.gain.setValueAtTime(0, timeReference);
        harmonicGain.gain.linearRampToValueAtTime(gainValue * 0.4, timeReference + 0.12);

        harmonicOsc.connect(harmonicGain);
        harmonicGain.connect(this.audioContext.destination);
        harmonicOsc.start();

        voice.oscillators.push(harmonicOsc);
        voice.gainNodes.push(harmonicGain);
      }

      return voice;
    }

    createBinauralVoice(frequency, waveform, gainValue, timeReference) {
      const carrier = 200;
      const diff = Math.min(30, Math.max(0.5, frequency));
      const leftFreq = Math.max(50, carrier - diff / 2);
      const rightFreq = carrier + diff / 2;
      const channelGain = Math.max(0.01, gainValue / 1.8);
      const normalized = this.resolveWaveform(waveform);

      const voices = ['left', 'right'].map((side, idx) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const panner = this.audioContext.createStereoPanner ? this.audioContext.createStereoPanner() : null;

        osc.type = normalized;
        osc.frequency.setValueAtTime(idx === 0 ? leftFreq : rightFreq, timeReference);

        gain.gain.setValueAtTime(0, timeReference);
        gain.gain.linearRampToValueAtTime(channelGain, timeReference + 0.2);

        osc.connect(gain);
        if (panner) {
          panner.pan.setValueAtTime(idx === 0 ? -0.7 : 0.7, timeReference);
          gain.connect(panner);
          panner.connect(this.audioContext.destination);
        } else {
          gain.connect(this.audioContext.destination);
        }
        osc.start();

        return { osc, gain };
      });

      return {
        oscillators: voices.map(v => v.osc),
        gainNodes: voices.map(v => v.gain)
      };
    }

    stop() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      const hadPlayback = this.isPlaying && this.playbackStart;
      const elapsedMs = this.playbackStart ? Date.now() - this.playbackStart : 0;

      if (!this.voices.length) {
        if (hadPlayback) {
          this.emitEvent('healtone:player-stop', {
            frequencies: this.currentFrequency,
            elapsedMs,
            duration: this.requestedDuration
          });
        }
        this.isPlaying = false;
        this.currentFrequency = null;
        this.playbackStart = null;
        this.requestedDuration = null;
        return;
      }

      const stopTime = this.audioContext ? this.audioContext.currentTime + 0.1 : 0;
      this.voices.forEach(voice => {
        const gains = voice.gainNodes || (voice.gain ? [voice.gain] : []);
        const oscillators = voice.oscillators || (voice.osc ? [voice.osc] : []);

        gains.forEach(gain => {
          if (!gain || !this.audioContext) return;
          gain.gain.cancelScheduledValues(this.audioContext.currentTime);
          gain.gain.linearRampToValueAtTime(0, stopTime);
        });

        oscillators.forEach(osc => {
          setTimeout(() => {
            try {
              osc?.stop();
            } catch (err) {
              /* oscillator already stopped */
            }
          }, 120);
        });
      });

      this.voices = [];
      if (hadPlayback) {
        this.emitEvent('healtone:player-stop', {
          frequencies: this.currentFrequency,
          elapsedMs,
          duration: this.requestedDuration
        });
      }
      this.isPlaying = false;
      this.currentFrequency = null;
      this.playbackStart = null;
      this.requestedDuration = null;
    }

    setVolume(volume) {
      if (!this.audioContext || !this.voices.length) {
        return;
      }
      const gainValue = Math.max(0, Math.min(0.2, volume * 0.1));
      this.voices.forEach(voice => {
        const gains = voice.gainNodes || (voice.gain ? [voice.gain] : []);
        gains.forEach(gain => {
          gain.gain.setValueAtTime(gainValue, this.audioContext.currentTime);
        });
      });
    }
  }

  class TonePlayer {
    constructor() {
      this.synth = null;
      this.isPlaying = false;
    }

    init() {
      if (!this.synth) {
        this.synth = new windowObj.Tone.Synth().toDestination();
      }
    }

    async playFrequency(frequency, duration = null) {
      await windowObj.Tone.start();
      this.init();

      this.synth.triggerAttack(frequency);
      this.isPlaying = true;

      if (duration) {
        setTimeout(() => this.stop(), duration * 1000);
      }
    }

    stop() {
      if (this.synth) {
        this.synth.triggerRelease();
        this.isPlaying = false;
      }
    }
  }

  const namespace = {
    FrequencyPlayer,
    frequencyPlayer: new FrequencyPlayer(),
  };

  if (windowObj.Tone) {
    namespace.TonePlayer = TonePlayer;
    namespace.tonePlayer = new TonePlayer();
  }

  windowObj.HealTonePlayer = namespace;
})(window);