 (function (global) {
  class ManifestationToolkit {
    constructor(options = {}) {
      const globalCatalog = global.HealToneCatalog && Array.isArray(global.HealToneCatalog.frequencyCatalog)
        ? global.HealToneCatalog.frequencyCatalog
        : [];
      this.catalog = Array.isArray(options.catalog) ? options.catalog : globalCatalog;
      this.player = options.player || (global.HealTonePlayer ? global.HealTonePlayer.frequencyPlayer : null);
      this.supabase = options.supabaseClient || global.supabaseClient || global.supabase || null;
      this.user = options.user || null;

      this.state = this.loadState();
      this.activeRecommendationId = null;
      this.session = { isActive: false, timer: null, start: null, pausedOffset: 0 };
      this.bathPlayback = { activeId: null, hzList: [], index: 0, timeoutId: null, segmentDuration: 120, segmentDurations: null, waveforms: null, mode: null };
      this.persistTimer = null;
      this.elements = {};
      this.composerBaths = [];

      this.cacheElements();
      this.bindEvents();
      this.hydrateUI();
    }

    setUser(user) {
      const prevId = this.user?.id;
      this.user = user || null;
      const nextId = this.user?.id || null;

      if (!nextId) {
        // Logged out: reset to a clean, anonymous state
        this.state = this.getDefaultState(null);
        this.activeRecommendationId = null;
        this.composerBaths = [];
        this.bathPlayback = { activeId: null, hzList: [], index: 0, timeoutId: null, segmentDuration: 120, segmentDurations: null, waveforms: null, mode: null };
        this.saveState();
        this.refreshUI();
        return;
      }

      if (nextId !== prevId) {
        // Switched to a different user: start from that user’s clean/default state,
        // then hydrate from Supabase if a cloud profile exists.
        this.state = this.getDefaultState(nextId);
        this.activeRecommendationId = null;
        this.composerBaths = [];
        this.bathPlayback = { activeId: null, hzList: [], index: 0, timeoutId: null, segmentDuration: 120, segmentDurations: null, waveforms: null, mode: null };
        this.saveState();
        this.refreshUI();
        this.syncFromSupabase();
      }
    }

    cacheElements() {
      this.elements = {
        root: document.getElementById('manifestation'),
        form: document.getElementById('manifest-intention-form'),
        title: document.getElementById('manifest-intention-title'),
        category: document.getElementById('manifest-intention-category'),
        description: document.getElementById('manifest-intention-description'),
        slider: document.getElementById('manifest-intensity-slider'),
        sliderValue: document.getElementById('manifest-intensity-value'),
        setButton: document.getElementById('manifest-set-btn'),
        stats: {
          sessions: document.getElementById('manifest-total-sessions'),
          minutes: document.getElementById('manifest-total-minutes'),
          streak: document.getElementById('manifest-current-streak'),
          intentions: document.getElementById('manifest-intentions-set')
        },
        timer: document.getElementById('manifest-session-timer'),
        startBtn: document.getElementById('manifest-start'),
        pauseBtn: document.getElementById('manifest-pause'),
        stopBtn: document.getElementById('manifest-stop'),
        recommendations: document.getElementById('manifest-recommendations'),
        achievements: document.getElementById('manifest-achievements'),
        baths: document.getElementById('manifest-baths')
      };
    }

    bindEvents() {
      if (this.elements.slider && this.elements.sliderValue) {
        this.elements.slider.addEventListener('input', event => {
          this.elements.sliderValue.textContent = event.target.value;
        });
      }

      if (this.elements.form) {
        this.elements.form.addEventListener('submit', event => {
          event.preventDefault();
          this.setIntention();
        });
      }

      if (this.elements.setButton) {
        this.elements.setButton.addEventListener('click', () => this.setIntention());
      }

      if (this.elements.startBtn) {
        this.elements.startBtn.addEventListener('click', () => this.startSession());
      }

      if (this.elements.pauseBtn) {
        this.elements.pauseBtn.addEventListener('click', () => this.pauseSession());
      }

      if (this.elements.stopBtn) {
        this.elements.stopBtn.addEventListener('click', () => this.stopSession(true));
      }

      if (this.elements.recommendations) {
        this.elements.recommendations.addEventListener('click', event => {
          const card = event.target.closest('[data-rec-id]');
          if (!card) return;
          this.handleRecommendation(card.dataset.recId);
        });
      }

      if (this.elements.baths) {
        this.elements.baths.addEventListener('click', event => {
          const card = event.target.closest('[data-bath-id]');
          if (!card) return;
          this.handleBathToggle(card.dataset.bathId);
        });
      }
    }

    hydrateUI() {
      if (!this.elements.root) return;
      this.populateForm();
      this.renderStats();
      this.renderRecommendations();
      this.renderAchievements();
      this.renderBathGrid();
      this.updateTimerDisplay(0);
      this.updateSessionButtons();
    }

    getDefaultState(userId = null) {
      return {
        userId,
        currentIntention: null,
        stats: { sessions: 0, minutes: 0, streak: 0, intentions: 0 },
        achievements: {},
        lastSessionDate: null
      };
    }

    loadState() {
      const currentUserId = this.user?.id || null;
      try {
        const raw = localStorage.getItem('manifestationToolkit');
        if (raw) {
          const parsed = JSON.parse(raw);
          const storedUserId = parsed && typeof parsed === 'object' ? (parsed.userId || null) : null;

          // If the stored state belongs to a different user (or no user), start fresh
          if (!storedUserId || storedUserId !== currentUserId) {
            return this.getDefaultState(currentUserId);
          }

          // Merge onto defaults to ensure all fields exist
          return {
            ...this.getDefaultState(currentUserId),
            ...parsed,
            userId: currentUserId
          };
        }
      } catch (err) {
        console.warn('Unable to load manifestation state', err);
      }
      return this.getDefaultState(currentUserId);
    }

    saveState() {
      try {
        const currentUserId = this.user?.id || null;
        this.state.userId = currentUserId;
        localStorage.setItem('manifestationToolkit', JSON.stringify(this.state));
      } catch (err) {
        console.warn('Unable to persist manifestation state', err);
      }
    }

    populateForm() {
      const intention = this.state.currentIntention;
      if (!intention || !this.elements.form) return;
      if (this.elements.title) this.elements.title.value = intention.title || '';
      if (this.elements.category) this.elements.category.value = intention.category || 'abundance';
      if (this.elements.description) this.elements.description.value = intention.description || '';
      if (this.elements.slider) this.elements.slider.value = intention.intensity || 5;
      if (this.elements.sliderValue) this.elements.sliderValue.textContent = intention.intensity || 5;
    }

    setIntention() {
      if (!this.elements.title || !this.elements.category) return;
      const title = this.elements.title.value.trim();
      if (!title) {
        this.showToast('Give your intention a name first.');
        return;
      }

      this.state.currentIntention = {
        title,
        category: this.elements.category.value,
        description: (this.elements.description?.value || '').trim(),
        intensity: Number(this.elements.slider?.value || 5),
        updatedAt: new Date().toISOString()
      };

      this.state.stats.intentions += 1;
      this.unlockAchievement('first-intention');
      this.saveState();
      this.scheduleSupabasePersist();
      this.renderStats();
      this.renderRecommendations();
      this.renderAchievements();
      this.showToast('Intention locked in. Recommendations updated.');
    }

    renderStats() {
      if (!this.elements.stats) return;
      const { sessions, minutes, streak, intentions } = this.state.stats;
      this.elements.stats.sessions.textContent = sessions;
      this.elements.stats.minutes.textContent = minutes;
      this.elements.stats.streak.textContent = streak;
      this.elements.stats.intentions.textContent = intentions;
    }

    renderRecommendations() {
      if (!this.elements.recommendations) return;

      if (!this.state.currentIntention) {
        this.elements.recommendations.innerHTML = '<div class="manifest-empty">Set an intention to unlock curated sequences.</div>';
        return;
      }

      const items = this.getRecommendationsForCategory(this.state.currentIntention.category);
      if (!items.length) {
        this.elements.recommendations.innerHTML = '<div class="manifest-empty">No presets found for this theme yet.</div>';
        return;
      }

      const fragment = document.createDocumentFragment();
      items.forEach(preset => {
        const isActive = this.activeRecommendationId === preset.id;
        const hzLabel = Array.isArray(preset.hz)
          ? preset.hz.map(hz => `${hz} Hz`).join(' · ')
          : `${preset.hz} Hz`;
        const card = document.createElement('div');
        card.className = `recommendation-card${isActive ? ' playing' : ''}`;
        card.dataset.recId = preset.id;
        const actionLabel = isActive
          ? 'Stop'
          : (preset.type === 'single' || preset.type === 'binaural' ? 'Play' : 'Launch Bath');
        card.innerHTML = `
          <div>
            <div class="frequency-name">${preset.name}</div>
            <div class="recommendation-meta">${hzLabel} · ${preset.category}</div>
          </div>
          <div class="recommendation-action">${actionLabel}</div>
        `;
        fragment.appendChild(card);
      });

      this.elements.recommendations.innerHTML = '';
      this.elements.recommendations.appendChild(fragment);
    }

    renderBathGrid() {
      if (!this.elements.baths) return;
      const imported = Array.isArray(this.composerBaths) ? this.composerBaths : [];
      const catalog = this.getManifestationBathCatalog();
      const baths = [...imported, ...catalog];
      if (!baths.length) {
        this.elements.baths.innerHTML = '<div class="manifest-empty">Manifestation bath catalog coming online shortly.</div>';
        return;
      }

      const fragment = document.createDocumentFragment();
      baths.forEach(bath => {
        const card = document.createElement('article');
        const isActive = this.bathPlayback?.activeId === bath.id;
        card.className = `manifest-bath-card${isActive ? ' playing' : ''}`;
        card.dataset.bathId = bath.id;
        const hzLabel = Array.isArray(bath.hz) ? bath.hz.map(h => `${h} Hz`).join(' · ') : '';
        const badge = bath.source === 'composer'
          ? '<span style="margin-left:0.35rem;padding:0.1rem 0.4rem;border:1px solid rgba(224,231,255,0.4);border-radius:999px;font-size:0.65rem;letter-spacing:0.05em;">Composer</span>'
          : '';
        const buttonLabel = bath.source === 'composer' ? 'Play Custom Bath' : 'Play Bath';
        card.innerHTML = `
          <div class="manifest-bath-name">${bath.name}${badge}</div>
          <div class="manifest-bath-freqs">${hzLabel}</div>
          <p class="manifest-bath-desc">${bath.usage || bath.notes || 'Harmonic field session'}</p>
          <button class="btn-manifest btn-primary" type="button" aria-pressed="${isActive}">${isActive ? 'Stop Bath' : buttonLabel}</button>
        `;
        fragment.appendChild(card);
      });

      this.elements.baths.innerHTML = '';
      this.elements.baths.appendChild(fragment);
    }

    getCatalogEntry(id) {
      if (!id || !Array.isArray(this.catalog)) {
        return null;
      }
      return this.catalog.find(entry => entry && entry.id === id) || null;
    }

    getManifestationBathCatalog() {
      if (!Array.isArray(this.catalog)) {
        return [];
      }
      return this.catalog
        .filter(entry => entry && entry.category === 'manifestation' && entry.type !== 'single' && entry.type !== 'binaural')
        .map(entry => this.normalizeCatalogBath(entry))
        .filter(Boolean);
    }

    normalizeCatalogBath(entry) {
      if (!entry) {
        return null;
      }
      const hzArray = Array.isArray(entry.hz)
        ? entry.hz.filter(value => typeof value === 'number')
        : [entry.hz].filter(value => typeof value === 'number');
      return {
        id: entry.id,
        name: entry.name,
        type: entry.type === 'sequence' ? 'sequence' : 'bath',
        hz: hzArray,
        waveform: entry.waveform || 'sine',
        category: entry.category || 'manifestation',
        usage: entry.usage || entry.notes || entry.description || 'Harmonic field session',
        duration: entry.duration || entry.duration_seconds || null,
        segmentDuration: entry.segmentDuration || null,
        sequenceDurations: entry.sequenceDurations || null,
        source: entry.source || 'catalog'
      };
    }

    importComposerBath(bath) {
      if (!bath || !Array.isArray(bath.layers) || !bath.layers.length) {
        this.showToast('Composer bath is missing layers.');
        return;
      }

      const hzList = bath.layers.map(layer => Number(layer.hz)).filter(Boolean);
      if (!hzList.length) {
        this.showToast('Composer bath needs at least one frequency.');
        return;
      }

      const durations = bath.layers.map(layer => Math.max(30, Number(layer.duration) || 120));
      const normalizedId = bath.id && typeof bath.id === 'string' ? `composer-${bath.id}` : `composer-${Date.now()}`;
      const normalized = {
        id: normalizedId,
        name: bath.name || 'Composer Bath',
        type: bath.mode === 'sequence' ? 'sequence' : 'layered',
        hz: hzList,
        waveform: bath.layers.map(layer => layer.waveform || 'sine'),
        category: 'manifestation',
        usage: 'Imported from Composer',
        duration: bath.mode === 'sequence'
          ? durations.reduce((acc, value) => acc + value, 0)
          : Math.max(...durations),
        segmentDuration: bath.mode === 'sequence' ? durations[0] : undefined,
        sequenceDurations: bath.mode === 'sequence' ? durations : null,
        source: 'composer'
      };

      if (!Array.isArray(this.composerBaths)) {
        this.composerBaths = [];
      }
      this.composerBaths = [normalized, ...this.composerBaths.filter(item => item.id !== normalized.id)].slice(0, 8);
      this.renderBathGrid();
      this.showToast('Composer bath ready in Manifestation tab.');
      if (this.elements.baths?.scrollIntoView) {
        this.elements.baths.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    renderAchievements() {
      if (!this.elements.achievements) return;
      const achievements = this.getAchievementCatalog();
      const fragment = document.createDocumentFragment();

      achievements.forEach(item => {
        let unlocked = Boolean(this.state.achievements[item.id]);
        if (!unlocked && item.check(this.state) === true) {
          this.state.achievements[item.id] = true;
          unlocked = true;
          this.saveState();
          this.scheduleSupabasePersist();
          this.showToast(`${item.name} unlocked`);
        }

        const card = document.createElement('div');
        card.className = `achievement-card${unlocked ? ' unlocked' : ''}`;
        card.innerHTML = `
          <div class="achievement-icon">${item.icon}</div>
          <div class="achievement-name">${item.name}</div>
          <div class="achievement-desc">${item.description}</div>
        `;
        fragment.appendChild(card);
      });

      this.elements.achievements.innerHTML = '';
      this.elements.achievements.appendChild(fragment);
    }

    getAchievementCatalog() {
      return [
        {
          id: 'first-intention',
          name: 'Intention Initiate',
          description: 'Set your first manifestation target.',
          icon: '✨',
          check: state => state.stats.intentions > 0
        },
        {
          id: 'session-5',
          name: 'Momentum Builder',
          description: 'Complete 5 manifestation sessions.',
          icon: '⚡',
          check: state => state.stats.sessions >= 5
        },
        {
          id: 'streak-3',
          name: 'Consistency Alchemist',
          description: 'Maintain a 3-day streak.',
          icon: '🔥',
          check: state => state.stats.streak >= 3
        },
        {
          id: 'minutes-120',
          name: 'Time Investor',
          description: 'Spend 120 mindful minutes.',
          icon: '⏱️',
          check: state => state.stats.minutes >= 120
        }
      ];
    }

    getRecommendationsForCategory(category) {
      const map = {
        abundance: ['emotional-396', 'emotional-528', 'bath-abundance-flow', 'bath-infinite-prosperity'],
        love: ['emotional-528', 'emotional-639', 'bath-self-love', 'bath-opportunity-magnet'],
        health: ['heal-285', 'heal-528', 'bath-rapid-recovery', 'bath-pain-dissolver'],
        career: ['mental-010', 'mental-014', 'bath-focus', 'bath-logic-reasoning'],
        spiritual: ['spirit-432', 'spirit-852', 'bath-awakening-gateway', 'bath-quantum-creation'],
        creativity: ['mental-006', 'spirit-432', 'bath-quantum-creation', 'bath-chakra-alignment']
      };

      const ids = map[category] || [];
      return ids
        .map(id => this.lookupPreset(id))
        .filter(Boolean);
    }

    lookupPreset(id) {
      return this.getCatalogEntry(id);
    }

    handleRecommendation(id) {
      if (!id) return;

      // Toggle behavior: if this recommendation is already active, stop playback.
      if (this.activeRecommendationId === id) {
        this.player?.stop?.();
        this.activeRecommendationId = null;
        this.renderRecommendations();
        return;
      }

      const preset = this.lookupPreset(id);
      if (!preset) return;

      // Start playback and mark this recommendation as active.
      if (preset.type === 'single' || preset.type === 'binaural') {
        this.playSingle(preset);
      } else {
        this.playBath(preset.id);
      }

      this.activeRecommendationId = id;
      this.renderRecommendations();
    }

    handleBathToggle(bathId) {
      if (!bathId) return;
      if (this.bathPlayback?.activeId === bathId) {
        this.stopBathPlayback();
        return;
      }
      this.playBath(bathId);
    }

    playSingle(preset) {
      if (!this.player) {
        this.showToast('Audio engine is loading. Try again in a moment.');
        return;
      }
      const hzArray = Array.isArray(preset.hz) ? preset.hz : [preset.hz];
      const hz = hzArray.find(value => typeof value === 'number');
      if (hz === undefined) {
        this.showToast('Preset is missing frequency data.');
        return;
      }
      const waveform = Array.isArray(preset.waveform) ? preset.waveform[0] : (preset.waveform || 'sine');
      const duration = preset.duration_seconds || preset.duration || 600;
      this.player.playFrequency(hz, duration, waveform);
      this.showToast(`Playing ${preset.name}`);
      this.broadcastFrequencyUse([preset.id].filter(Boolean));
    }

    playBath(bathId) {
      const customBath = (this.composerBaths || []).find(item => item.id === bathId);
      const catalogBath = customBath ? null : this.normalizeCatalogBath(this.getCatalogEntry(bathId));
      const bath = customBath || catalogBath;
      if (!bath) {
        this.showToast('Bath not found.');
        return;
      }
      if (!this.player) {
        this.showToast('Audio engine unavailable.');
        return;
      }
      const hzList = Array.isArray(bath.hz) ? bath.hz.filter(Boolean) : [bath.hz].filter(Boolean);
      if (!hzList.length) {
        this.showToast('Bath preset is missing frequency data.');
        return;
      }

      const isSequence = bath.type === 'sequence';
      this.stopBathPlayback();

      if (isSequence) {
        const segmentDurations = Array.isArray(bath.sequenceDurations) && bath.sequenceDurations.length ? bath.sequenceDurations : null;
        const segmentDuration = segmentDurations?.[0] || this.getBathSegmentDuration(bath, hzList.length);
        this.bathPlayback = {
          activeId: bath.id,
          hzList,
          index: 0,
          timeoutId: null,
          segmentDuration,
          segmentDurations,
          waveforms: Array.isArray(bath.waveform) ? bath.waveform : null,
          mode: 'sequence'
        };
        this.showToast(`Bath · ${bath.name}`);
        this.broadcastFrequencyUse([bath.id].filter(Boolean));
        this.runBathStep(bath);
        this.renderBathGrid();
        return;
      }

      this.playLayeredBath(bath, hzList);
      this.broadcastFrequencyUse([bath.id].filter(Boolean));
    }

    playLayeredBath(bath, hzList) {
      const duration = this.getLayeredDuration(bath, hzList.length);
      const waveforms = bath.waveform || 'sine';
      this.bathPlayback = { activeId: bath.id, hzList, index: 0, timeoutId: null, segmentDuration: duration, segmentDurations: null, waveforms: Array.isArray(waveforms) ? waveforms : null, mode: 'layered' };

      if (typeof this.player.playFrequencies === 'function') {
        this.player.playFrequencies(hzList, duration, waveforms);
      } else {
        // Fallback: rapid micro-sequence so older player still cycles audibly
        this.bathPlayback.segmentDuration = 20;
        this.runBathStep(bath);
      }

      this.showToast(`Bath • ${bath.name}`);
      this.renderBathGrid();
    }

    runBathStep(bath) {
      if (!this.bathPlayback || this.bathPlayback.activeId !== bath.id) {
        return;
      }
      const playback = this.bathPlayback;
      if (playback.index >= playback.hzList.length) {
        this.stopBathPlayback();
        this.showToast(`${bath.name} complete`);
        return;
      }

      const hz = playback.hzList[playback.index];
      const waveform = playback.waveforms ? playback.waveforms[playback.index % playback.waveforms.length] : 'sine';
      this.player.stop?.();
      const duration = playback.segmentDurations
        ? playback.segmentDurations[Math.min(playback.index, playback.segmentDurations.length - 1)] || playback.segmentDuration
        : playback.segmentDuration;
      this.player.playFrequency(hz, duration, waveform);
      playback.index += 1;
      playback.timeoutId = window.setTimeout(() => this.runBathStep(bath), duration * 1000);
    }

    stopBathPlayback() {
      if (this.bathPlayback?.timeoutId) {
        clearTimeout(this.bathPlayback.timeoutId);
      }
      this.player?.stop?.();
      this.bathPlayback = { activeId: null, hzList: [], index: 0, timeoutId: null, segmentDuration: 120, segmentDurations: null, waveforms: null, mode: null };
      this.renderBathGrid();
    }

    getBathSegmentDuration(bath, slices) {
      if (bath.segmentDuration) {
        return bath.segmentDuration;
      }
      if (bath.duration) {
        const perSlice = Math.max(30, Math.round(bath.duration / slices));
        return perSlice;
      }
      return 90;
    }

    getLayeredDuration(bath, slices) {
      if (bath.duration) {
        return bath.duration;
      }
      if (bath.segmentDuration) {
        return bath.segmentDuration * slices;
      }
      return Math.max(240, slices * 90);
    }

    startSession() {
      if (this.session.isActive) return;

      this.session.isActive = true;
      const resumeOffset = this.session.pausedOffset || 0;
      this.session.start = Date.now() - resumeOffset;
      this.session.pausedOffset = 0;
      this.session.timer = window.setInterval(() => this.tickSession(), 1000);
      this.updateSessionButtons();
      this.showToast('Session started');
    }

    pauseSession() {
      if (!this.session.isActive) return;
      this.session.isActive = false;
      this.session.pausedOffset = Date.now() - this.session.start;
      window.clearInterval(this.session.timer);
      this.updateSessionButtons();
      this.showToast('Session paused');
    }

    stopSession(markComplete = false) {
      if (!this.session.start) return;
      const elapsed = this.session.isActive
        ? Date.now() - this.session.start
        : (this.session.pausedOffset || 0);
      window.clearInterval(this.session.timer);
      const minutes = Math.max(1, Math.round(elapsed / 60000));

      this.session = { isActive: false, timer: null, start: null, pausedOffset: 0 };
      this.updateTimerDisplay(0);
      this.updateSessionButtons();

      if (markComplete) {
        this.state.stats.sessions += 1;
        this.state.stats.minutes += minutes;
        this.updateStreak();
        this.saveState();
        this.scheduleSupabasePersist();
        this.renderStats();
        this.renderAchievements();
        this.showToast(`Session saved · ${minutes} min`);
        try {
          window.dispatchEvent(new CustomEvent('manifestation:session-complete', {
            detail: {
              minutes,
              intention: this.state.currentIntention || null
            }
          }));
        } catch (eventError) {
          console.warn('Manifestation session event failed', eventError);
        }
      }
    }

    updateStreak() {
      const today = new Date().toISOString().slice(0, 10);
      if (!this.state.lastSessionDate) {
        this.state.lastSessionDate = today;
        this.state.stats.streak = 1;
        return;
      }

      if (this.state.lastSessionDate === today) {
        return;
      }

      const previous = new Date(this.state.lastSessionDate);
      const diff = Math.round((new Date(today) - previous) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        this.state.stats.streak += 1;
      } else {
        this.state.stats.streak = 1;
      }
      this.state.lastSessionDate = today;
    }

    tickSession() {
      if (!this.session.isActive || !this.session.start) return;
      const elapsed = Date.now() - this.session.start;
      this.updateTimerDisplay(elapsed);
    }

    updateTimerDisplay(elapsedMs) {
      if (!this.elements.timer) return;
      const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      this.elements.timer.textContent = `${minutes}:${seconds}`;
    }

    updateSessionButtons() {
      if (!this.elements.startBtn || !this.elements.pauseBtn || !this.elements.stopBtn) return;
      this.elements.startBtn.disabled = this.session.isActive;
      this.elements.pauseBtn.disabled = !this.session.isActive;
      this.elements.stopBtn.disabled = !this.session.start;
    }

    unlockAchievement(id) {
      if (this.state.achievements[id]) return;
      this.state.achievements[id] = true;
      this.saveState();
      this.scheduleSupabasePersist();
    }

    scheduleSupabasePersist(delay = 500) {
      if (!this.supabase || !this.user) {
        return;
      }
      if (this.persistTimer) {
        clearTimeout(this.persistTimer);
      }
      this.persistTimer = setTimeout(() => {
        this.persistTimer = null;
        this.persistToSupabase();
      }, delay);
    }

    async persistToSupabase() {
      if (!this.supabase || !this.user) {
        return;
      }
      try {
        await this.supabase
          .from('manifestation_profiles')
          .upsert({
            user_id: this.user.id,
            current_intention: this.state.currentIntention,
            stats: this.state.stats,
            achievements: this.state.achievements,
            last_session_date: this.state.lastSessionDate,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });
      } catch (err) {
        console.warn('Manifestation Supabase sync failed', err);
      }
    }

    async syncFromSupabase() {
      if (!this.supabase || !this.user) {
        return;
      }
      try {
        const { data, error } = await this.supabase
          .from('manifestation_profiles')
          .select('current_intention,stats,achievements,last_session_date')
          .eq('user_id', this.user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }
        if (!data) {
          // No cloud profile yet for this user: keep a clean default state
          this.state = this.getDefaultState(this.user?.id || null);
          this.saveState();
          this.refreshUI();
          return;
        }

        this.state.currentIntention = data.current_intention || null;
        if (data.stats) {
          this.state.stats = { ...this.state.stats, ...data.stats };
        }
        if (data.achievements) {
          this.state.achievements = { ...this.state.achievements, ...data.achievements };
        }
        this.state.lastSessionDate = data.last_session_date || this.state.lastSessionDate;
        this.saveState();
        this.refreshUI();
      } catch (err) {
        console.warn('Manifestation Supabase fetch failed', err);
      }
    }

    broadcastFrequencyUse(ids = []) {
      if (!Array.isArray(ids) || !ids.length) {
        return;
      }
      try {
        window.dispatchEvent(new CustomEvent('healtone:frequencies-tried', {
          detail: { ids }
        }));
      } catch (err) {
        console.warn('Frequency tracking event failed', err);
      }
    }

    showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'notification-toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.animation = 'toast-out 0.25s forwards';
        setTimeout(() => toast.remove(), 250);
      }, 2200);
    }

    refreshUI() {
      this.populateForm();
      this.renderStats();
      this.renderRecommendations();
      this.renderAchievements();
      this.updateSessionButtons();
    }
  }

  global.ManifestationToolkit = ManifestationToolkit;
})(window);
