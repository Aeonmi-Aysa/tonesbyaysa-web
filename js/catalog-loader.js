(function (global) {
  const EMPTY = {
    frequencyCatalog: [],
    frequencyPacks: [],
    frequencyTiers: []
  };

  let pendingLoad = null;

  function getSupabaseClient() {
    if (global.supabaseClient && typeof global.supabaseClient.from === 'function') {
      return global.supabaseClient;
    }
    if (typeof supabase !== 'undefined' && typeof supabase.from === 'function') {
      return supabase;
    }
    return null;
  }

  function buildCatalogObject(catalog = [], packs = [], tiers = [], source = 'embedded') {
    const byId = new Map();
    catalog.filter(Boolean).forEach(item => byId.set(item.id, item));
    return {
      frequencyCatalog: catalog,
      frequencyPacks: packs,
      frequencyTiers: tiers,
      getFrequency: (id) => byId.get(id) || null,
      listFrequencies: () => catalog,
      listPacks: () => packs,
      listTiers: () => tiers,
      __source: source
    };
  }

  function applyCatalog(data = {}, source = 'embedded') {
    const next = buildCatalogObject(
      data.frequencyCatalog || EMPTY.frequencyCatalog,
      data.frequencyPacks || EMPTY.frequencyPacks,
      data.frequencyTiers || EMPTY.frequencyTiers,
      source
    );
    global.HealToneCatalog = next;
    return next;
  }

  async function fetchTable(client, table, orderBy) {
    let query = client.from(table).select('*');
    if (orderBy?.column) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending !== false });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async function loadCatalog(options = {}) {
    if (pendingLoad && !options.force) {
      return pendingLoad;
    }

    const client = getSupabaseClient();
    if (!client) {
      if (!global.HealToneCatalog) {
        applyCatalog(global.HealToneCatalog || EMPTY, 'embedded');
      }
      return global.HealToneCatalog;
    }

    pendingLoad = (async () => {
      const [catalog, packs, tiers] = await Promise.all([
        fetchTable(client, 'frequency_catalog', { column: 'name' }),
        fetchTable(client, 'frequency_packs', { column: 'title' }),
        fetchTable(client, 'frequency_tiers', { column: 'price_usd' })
      ]);
      return applyCatalog(
        {
          frequencyCatalog: catalog,
          frequencyPacks: packs,
          frequencyTiers: tiers
        },
        'supabase'
      );
    })();

    try {
      return await pendingLoad;
    } catch (error) {
      console.error('CatalogLoader failed to pull Supabase data', error);
      pendingLoad = null;
      if (!global.HealToneCatalog) {
        return applyCatalog(EMPTY, 'embedded');
      }
      return global.HealToneCatalog;
    }
  }

  global.CatalogLoader = {
    loadCatalog,
    applyCatalog,
    buildCatalogObject
  };
})(window);
