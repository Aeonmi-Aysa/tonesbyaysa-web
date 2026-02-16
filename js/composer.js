(function (global) {
  class FrequencyComposer {
    constructor(options = {}) {
      const globalCatalog = global.HealToneCatalog && Array.isArray(global.HealToneCatalog.frequencyCatalog)
        ? global.HealToneCatalog.frequencyCatalog
        : [];
      const globalPacks = global.HealToneCatalog && Array.isArray(global.HealToneCatalog.frequencyPacks)
        ? global.HealToneCatalog.frequencyPacks
        : [];
      const globalTiers = global.HealToneCatalog && Array.isArray(global.HealToneCatalog.frequencyTiers)
        ? global.HealToneCatalog.frequencyTiers
        : [];

      this.catalog = Array.isArray(options.catalog) ? options.catalog : globalCatalog;
      this.packs = Array.isArray(options.packs) ? options.packs : globalPacks;
      this.tiers = Array.isArray(options.tiers) ? options.tiers : globalTiers;
      this.playerOption = options.player || null;
      this.supabase = options.supabaseClient || global.supabase || null;
      this.user = options.user || null;
      this.manifestation = options.manifestation || null;
      this.accessTier = typeof options.accessTier === 'string' ? options.accessTier : 'free';

      this.maxLayers = 6;
      this.layers = [];
      this.savedBaths = this.loadSavedBaths();
      this.libraryFilter = 'all';
      this.librarySearch = '';
      this.mode = 'blend';
      this.sequenceController = { timeoutId: null, index: 0 };

      this.elements = {};
      this.cacheElements();
      this.bindEvents();
      this.renderAll();
      this.syncFromSupabase();
    }

    setSupabaseClient(client) {
      this.supabase = client || null;
      if (this.supabase && this.user) {
        this.syncFromSupabase();
      }
    }

    setUser(user) {
      const previousId = this.user?.id;
      this.user = user || null;
      const nextId = this.user?.id || null;

      if (!nextId) {
        // Logged out: clear in-memory baths but leave any local storage copy untouched
        this.savedBaths = [];
        this.renderSavedBaths();
        return;
      }

      if (nextId !== previousId) {
        // Switched account: load baths for the new user and refresh from Supabase
        this.savedBaths = this.loadSavedBaths();
        this.renderSavedBaths();
        if (this.supabase) {
          this.syncFromSupabase();
        }
      }
    }

    setAccessTier(tier) {
      const normalized = typeof tier === 'string' ? tier.toLowerCase() : 'free';
      if (this.accessTier === normalized) {
        return;
      }
      this.accessTier = normalized;
      this.renderLibrary();
    }

    setManifestationInstance(instance) {
      this.manifestation = instance || null;
    }

    getPlayer() {
      if (this.playerOption) {
        return this.playerOption;
      }
      if (typeof window !== 'undefined' && window.HealTonePlayer && window.HealTonePlayer.frequencyPlayer) {
        return window.HealTonePlayer.frequencyPlayer;
      }
      return null;
    }

    get player() {
      return this.getPlayer();
    }

    cacheElements() {
      this.elements = {
        library: document.getElementById('composer-library'),
        filter: document.getElementById('composer-filter'),
        search: document.getElementById('composer-search'),
        layers: document.getElementById('composer-layers'),
        emptyState: document.getElementById('composer-empty'),
        timeline: document.getElementById('composer-timeline'),
        summary: document.getElementById('composer-summary'),
        titleInput: document.getElementById('composer-title'),
        playBtn: document.getElementById('composer-play'),
        stopBtn: document.getElementById('composer-stop'),
        clearBtn: document.getElementById('composer-clear'),
        saveBtn: document.getElementById('composer-save'),
        savedList: document.getElementById('composer-saved'),
        modeInputs: document.querySelectorAll('input[name="composer-mode"]')
      };
    }

    bindEvents() {
      if (this.elements.filter) {
        this.elements.filter.addEventListener('change', event => {
          this.libraryFilter = event.target.value;
          this.renderLibrary();
        });
      }

      if (this.elements.search) {
        this.elements.search.addEventListener('input', event => {
          this.librarySearch = event.target.value.trim().toLowerCase();
          this.renderLibrary();
        });
      }

      if (this.elements.library) {
        this.elements.library.addEventListener('click', event => {
          const button = event.target.closest('[data-preset-id]');
          if (!button) return;
          this.addLayer(button.dataset.presetId);
        });
      }

      if (this.elements.layers) {
        this.elements.layers.addEventListener('input', event => {
          const target = event.target;
          const layerId = target.dataset.layerId;
          if (!layerId) return;
          if (target.classList.contains('layer-duration')) {
            const display = target.closest('.composer-control')?.querySelector('span');
            if (display) {
              display.textContent = `${Math.round(Number(target.value) / 60)} min`;
            }
            this.updateLayerDuration(layerId, Number(target.value));
          }
          if (target.classList.contains('layer-volume')) {
            const display = target.closest('.composer-control')?.querySelector('span');
            if (display) {
              display.textContent = `${target.value}%`;
            }
            this.updateLayerVolume(layerId, Number(target.value));
          }
        });

        this.elements.layers.addEventListener('click', event => {
          const removeBtn = event.target.closest('[data-remove-layer]');
          if (removeBtn) {
            this.removeLayer(removeBtn.dataset.removeLayer);
            return;
          }
        });
      }

      if (this.elements.modeInputs?.length) {
        this.elements.modeInputs.forEach(input => {
          input.addEventListener('change', event => {
            if (!event.target.checked) return;
            this.mode = event.target.value;
            this.renderSummary();
          });
        });
      }

      this.elements.playBtn?.addEventListener('click', () => this.playStack());
      this.elements.stopBtn?.addEventListener('click', () => this.stopPlayback());
      this.elements.clearBtn?.addEventListener('click', () => this.clearLayers());
      this.elements.saveBtn?.addEventListener('click', () => this.saveCurrentDesign());

      if (this.elements.savedList) {
        this.elements.savedList.addEventListener('click', event => {
          const loadBtn = event.target.closest('[data-load-bath]');
          if (loadBtn) {
            this.loadSavedBath(loadBtn.dataset.loadBath);
            return;
          }
          const manifestBtn = event.target.closest('[data-manifest-bath]');
          if (manifestBtn) {
            this.sendToManifestation(manifestBtn.dataset.manifestBath);
            return;
          }
          const deleteBtn = event.target.closest('[data-delete-bath]');
          if (deleteBtn) {
            this.deleteSavedBath(deleteBtn.dataset.deleteBath);
          }
        });
      }
    }

    renderAll() {
      this.renderLibrary();
      this.renderLayers();
      this.renderTimeline();
      this.renderSummary();
      this.renderSavedBaths();
    }

    refreshUI() {
      this.renderAll();
    }

    getLibraryCatalog() {
      const singles = Array.isArray(this.catalog)
        ? this.catalog.filter(item =>
            item && (item.type === 'single' || item.type === 'binaural') && this.canAccessEntry(item)
          )
        : [];
      return singles.map(item => {
        const hzArray = Array.isArray(item.hz) ? item.hz : [item.hz];
        return {
          id: item.id,
          name: item.name,
          category: item.category || 'healing',
          hz: hzArray.filter(value => typeof value === 'number'),
          hzLabel: hzArray.filter(value => typeof value === 'number').map(h => `${h} Hz`).join(' · '),
          waveform: Array.isArray(item.waveform) ? item.waveform[0] : (item.waveform || 'sine'),
          description: item.usage || item.notes || item.description || 'Signature frequency.'
        };
      });
    }

    renderLibrary() {
      if (!this.elements.library) return;
      const catalog = this.getLibraryCatalog().filter(item => {
        const matchesFilter = this.libraryFilter === 'all' || item.category === this.libraryFilter;
        const searchTarget = `${item.name} ${item.hzLabel}`.toLowerCase();
        const matchesSearch = !this.librarySearch || searchTarget.includes(this.librarySearch);
        return matchesFilter && matchesSearch;
      });

      if (!catalog.length) {
        this.elements.library.innerHTML = '<div class="composer-empty-state" style="min-height:120px;">No frequencies match this view.</div>';
        return;
      }

      const fragment = document.createDocumentFragment();
      catalog.forEach(item => {
        const card = document.createElement('article');
        card.className = 'composer-library-card';
        card.innerHTML = `
          <h4>${item.name}</h4>
          <div class="composer-library-meta">
            <span>${item.hzLabel}</span>
            <span>${item.category}</span>
          </div>
          <p style="font-size:0.85rem;color:rgba(224,231,255,0.8);">${item.description}</p>
          <button type="button" data-preset-id="${item.id}">Add Layer</button>
        `;
        fragment.appendChild(card);
      });

      this.elements.library.innerHTML = '';
      this.elements.library.appendChild(fragment);
    }

    canAccessEntry(entry) {
      if (!entry) {
        return false;
      }
      if (this.accessTier === 'weekly' || this.accessTier === 'lifetime') {
        return true;
      }
      const tierAccess = entry.tier_access || entry.tier;
      return tierAccess === 'free';
    }

    addLayer(presetId) {
      const catalogEntry = this.getLibraryCatalog().find(item => item.id === presetId);
      if (!catalogEntry) {
        this.showToast('Frequency not found.');
        return;
      }
      if (this.layers.length >= this.maxLayers) {
        this.showToast('Layer limit reached (6).');
        return;
      }
      const hzValue = catalogEntry.hz[0];
      if (!hzValue && hzValue !== 0) {
        this.showToast('Frequency missing Hz data.');
        return;
      }

      this.layers.push({
        uid: `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        presetId,
        name: catalogEntry.name,
        category: catalogEntry.category,
        hz: hzValue,
        hzLabel: catalogEntry.hzLabel,
        waveform: catalogEntry.waveform || 'sine',
        duration: 120,
        volume: 80
      });

      this.renderLayers();
      this.renderTimeline();
      this.renderSummary();
    }

    removeLayer(uid) {
      this.layers = this.layers.filter(layer => layer.uid !== uid);
      this.renderLayers();
      this.renderTimeline();
      this.renderSummary();
    }

    updateLayerDuration(uid, seconds) {
      const target = this.layers.find(layer => layer.uid === uid);
      if (!target) return;
      target.duration = Math.max(30, Math.min(900, seconds));
      this.renderTimeline();
      this.renderSummary();
    }

    updateLayerVolume(uid, value) {
      const target = this.layers.find(layer => layer.uid === uid);
      if (!target) return;
      target.volume = Math.max(10, Math.min(100, value));
    }

    clearLayers() {
      this.stopPlayback(false);
      this.layers = [];
      this.renderLayers();
      this.renderTimeline();
      this.renderSummary();
    }

    renderLayers() {
      if (!this.elements.layers) return;
      if (!this.layers.length) {
        this.elements.layers.innerHTML = '<div class="composer-empty-state" id="composer-empty">Add frequencies from the library to start sculpting.</div>';
        this.elements.emptyState = document.getElementById('composer-empty');
        return;
      }

      const fragment = document.createDocumentFragment();
      this.layers.forEach(layer => {
        const row = document.createElement('div');
        row.className = 'composer-layer';
        row.innerHTML = `
          <div class="composer-layer-header">
            <div>
              <div class="composer-layer-name">${layer.name}</div>
              <div class="composer-layer-meta">${layer.hzLabel}</div>
            </div>
            <button class="composer-layer-remove" type="button" data-remove-layer="${layer.uid}">Remove</button>
          </div>
          <div class="composer-layer-controls">
            <label class="composer-control">Duration
              <input type="range" class="layer-duration" min="30" max="900" step="30" value="${layer.duration}" data-layer-id="${layer.uid}">
              <span>${Math.round(layer.duration / 60)} min</span>
            </label>
            <label class="composer-control">Volume Emphasis
              <input type="range" class="layer-volume" min="10" max="100" step="5" value="${layer.volume}" data-layer-id="${layer.uid}">
              <span>${layer.volume}%</span>
            </label>
          </div>
        `;
        fragment.appendChild(row);
      });

      this.elements.layers.innerHTML = '';
      this.elements.layers.appendChild(fragment);
    }

    renderTimeline() {
      if (!this.elements.timeline) return;
      if (!this.layers.length) {
        this.elements.timeline.innerHTML = '<div class="composer-empty-state" style="padding:0.75rem;">Timeline ready when you add layers.</div>';
        return;
      }

      const maxDuration = Math.max(...this.layers.map(layer => layer.duration));
      const fragment = document.createDocumentFragment();
      this.layers.forEach((layer, index) => {
        const row = document.createElement('div');
        row.className = 'composer-timeline-row';
        const percentage = maxDuration ? Math.max(5, (layer.duration / maxDuration) * 100) : 100;
        row.innerHTML = `
          <div class="composer-timeline-bar" style="width:${percentage}%; opacity:${0.8 - index * 0.08}"></div>
          <div class="composer-timeline-label">${layer.name} · ${Math.round(layer.duration / 60)}m</div>
        `;
        fragment.appendChild(row);
      });

      this.elements.timeline.innerHTML = '';
      this.elements.timeline.appendChild(fragment);
    }

    renderSummary() {
      if (!this.elements.summary) return;
      const totalLayers = this.layers.length;
      const runtimeSeconds = this.mode === 'sequence'
        ? this.layers.reduce((acc, layer) => acc + layer.duration, 0)
        : this.layers.reduce((acc, layer) => Math.max(acc, layer.duration), 0);
      const totalMinutes = Math.round(runtimeSeconds / 60) || 0;
      const modeLabel = this.mode === 'blend' ? 'Blend' : 'Sequence';
      this.elements.summary.innerHTML = `
        <span>${totalLayers} layer${totalLayers === 1 ? '' : 's'}</span>
        <span>Mode: ${modeLabel}</span>
        <span>Total runtime: ${totalMinutes} min</span>
      `;

      if (this.elements.modeInputs?.length) {
        this.elements.modeInputs.forEach(input => {
          input.checked = input.value === this.mode;
        });
      }
    }

    playStack() {
      if (!this.layers.length) {
        this.showToast('Add at least one layer first.');
        return;
      }
      if (!this.player) {
        this.showToast('Audio engine unavailable.');
        return;
      }

      this.stopPlayback(false);

      if (this.mode === 'sequence') {
        this.playSequence();
        return;
      }

      const hzList = this.layers.map(layer => Number(layer.hz));
      const waveforms = this.layers.map(layer => layer.waveform || 'sine');
      const duration = Math.max(...this.layers.map(layer => layer.duration)) || 120;
      if (typeof this.player.playFrequencies === 'function') {
        this.player.playFrequencies(hzList, duration, waveforms);
      } else {
        // fallback: sequential micro pulses
        this.mode = 'sequence';
        this.playSequence();
        this.mode = 'blend';
      }
    }

    playSequence() {
      if (!this.layers.length || !this.player) return;
      const queue = [...this.layers];
      this.sequenceController.index = 0;

      const runStep = () => {
        if (this.sequenceController.index >= queue.length) {
          this.stopPlayback(false);
          this.showToast('Sequence complete');
          return;
        }
        const layer = queue[this.sequenceController.index];
        this.player.playFrequency(Number(layer.hz), layer.duration, layer.waveform || 'sine');
        this.sequenceController.index += 1;
        this.sequenceController.timeoutId = global.setTimeout(runStep, layer.duration * 1000);
      };

      runStep();
    }

    stopPlayback(showToast = true) {
      if (this.sequenceController.timeoutId) {
        clearTimeout(this.sequenceController.timeoutId);
        this.sequenceController.timeoutId = null;
      }
      this.player?.stop?.();
      if (showToast) {
        this.showToast('Playback stopped');
      }
    }

    saveCurrentDesign() {
      if (!this.layers.length) {
        this.showToast('Nothing to save yet.');
        return;
      }
      const name = (this.elements.titleInput?.value || '').trim() || `Custom Bath ${this.savedBaths.length + 1}`;
      const payload = {
        id: `bath-${Date.now()}`,
        name,
        mode: this.mode,
        layers: this.layers.map(layer => ({ ...layer })),
        savedAt: new Date().toISOString()
      };
      this.savedBaths.unshift(payload);
      this.persistSavedBaths();
      this.renderSavedBaths();
      this.syncBathToSupabase(payload);
      this.showToast('Bath saved to your library.');
    }

    renderSavedBaths() {
      if (!this.elements.savedList) return;
      if (!this.savedBaths.length) {
        this.elements.savedList.innerHTML = '<div class="composer-empty-saved">No custom baths yet.</div>';
        return;
      }

      const fragment = document.createDocumentFragment();
      this.savedBaths.forEach(item => {
        const card = document.createElement('article');
        card.className = 'composer-saved-card';
        const layersLabel = `${item.layers.length} layer${item.layers.length === 1 ? '' : 's'}`;
        card.innerHTML = `
          <h4>${item.name}</h4>
          <div class="composer-saved-meta">${layersLabel} · ${item.mode === 'blend' ? 'Blend' : 'Sequence'}</div>
          <div class="composer-saved-actions">
            <button class="load-btn" type="button" data-load-bath="${item.id}">Load</button>
            <button class="load-btn" type="button" data-manifest-bath="${item.id}">Manifest</button>
            <button class="delete-btn" type="button" data-delete-bath="${item.id}">Delete</button>
          </div>
        `;
        fragment.appendChild(card);
      });

      this.elements.savedList.innerHTML = '';
      this.elements.savedList.appendChild(fragment);
    }

    loadSavedBath(bathId) {
      const bath = this.savedBaths.find(item => item.id === bathId);
      if (!bath) return;
      this.layers = (bath.layers || []).map(layer => ({ ...layer }));
      this.mode = bath.mode || 'blend';
      if (this.elements.titleInput) {
        this.elements.titleInput.value = bath.name;
      }
      this.renderLayers();
      this.renderTimeline();
      this.renderSummary();
      this.showToast(`Loaded ${bath.name}`);
    }

    deleteSavedBath(bathId) {
      this.savedBaths = this.savedBaths.filter(item => item.id !== bathId);
      this.persistSavedBaths();
      this.renderSavedBaths();
      this.deleteBathFromSupabase(bathId);
      this.showToast('Deleted saved bath.');
    }

    getBathStorageKey() {
      const userId = this.user?.id;
      return userId ? `composerCustomBaths:${userId}` : 'composerCustomBaths';
    }

    loadSavedBaths() {
      try {
        const key = this.getBathStorageKey();
        const raw = global.localStorage?.getItem(key);
        return raw ? JSON.parse(raw) : [];
      } catch (err) {
        console.warn('Unable to load saved baths', err);
        return [];
      }
    }

    persistSavedBaths() {
      try {
        const key = this.getBathStorageKey();
        global.localStorage?.setItem(key, JSON.stringify(this.savedBaths));
      } catch (err) {
        console.warn('Unable to persist baths', err);
      }
    }

    async syncFromSupabase() {
      if (!this.supabase || !this.user) {
        return;
      }
      try {
        const { data, error } = await this.supabase
          .from('saved_baths')
          .select('bath_id,name,mode,layers,saved_at')
          .eq('user_id', this.user.id)
          .order('saved_at', { ascending: false });

        // FIX: Gracefully handle missing table
        if (error && (error.code === '42P01' || error.message.includes('relation'))) {
          console.warn('saved_baths table not yet created - using local storage only');
          return;
        }

        if (error) {
          throw error;
        }

        if (Array.isArray(data)) {
          this.savedBaths = data.map(row => ({
            id: row.bath_id,
            name: row.name,
            mode: row.mode || 'blend',
            layers: row.layers || [],
            savedAt: row.saved_at || new Date().toISOString()
          }));
          this.persistSavedBaths();
          this.renderSavedBaths();
        }
      } catch (err) {
        console.warn('Composer Supabase sync attempted but tables may not exist', err);
      }
    }

    async syncBathToSupabase(bath) {
      if (!this.supabase || !this.user || !bath) {
        return;
      }
      try {
        await this.supabase
          .from('saved_baths')
          .upsert({
            user_id: this.user.id,
            bath_id: bath.id,
            name: bath.name,
            mode: bath.mode,
            layers: bath.layers,
            saved_at: bath.savedAt
          }, { onConflict: 'bath_id' });
      } catch (err) {
        console.warn('Composer Supabase save failed', err);
      }
    }

    async deleteBathFromSupabase(bathId) {
      if (!this.supabase || !this.user || !bathId) {
        return;
      }
      try {
        await this.supabase
          .from('saved_baths')
          .delete()
          .eq('user_id', this.user.id)
          .eq('bath_id', bathId);
      } catch (err) {
        console.warn('Composer Supabase delete failed', err);
      }
    }

    sendToManifestation(bathId) {
      if (!this.manifestation || typeof this.manifestation.importComposerBath !== 'function') {
        this.showToast('Manifestation toolkit unavailable.');
        return;
      }
      const bath = this.savedBaths.find(item => item.id === bathId);
      if (!bath) {
        this.showToast('Bath not found.');
        return;
      }
      try {
        this.manifestation.importComposerBath({ ...bath });
        this.showToast('Bath queued in Manifestation tab.');
      } catch (err) {
        console.warn('Manifestation import failed', err);
        this.showToast('Unable to queue bath right now.');
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
  }

  global.FrequencyComposer = FrequencyComposer;
})(window);