/**
 * HealTone™ Favorites Manager
 * Manages favorites with Supabase sync
 */

class FavoritesManager {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
    this.favorites = new Set();
    this.loaded = false;
  }

  async init() {
    await this.loadFavorites();
    this.loaded = true;
  }

  async loadFavorites() {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        this.favorites.clear();
        return;
      }

      const { data, error } = await this.supabase
        .from('favorites')
        .select('item_id')
        .eq('user_id', user.id);

      if (error) throw error;

      this.favorites = new Set((data || []).map(f => f.item_id));
      console.log(`Loaded ${this.favorites.size} favorites`);
    } catch (error) {
      console.error('Error loading favorites:', error);
      this.favorites = new Set();
    }
  }

  isFavorite(itemId) {
    return this.favorites.has(itemId);
  }

  async toggleFavorite(itemId, itemType = 'frequency') {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        alert('Please sign in to save favorites');
        return false;
      }

      const isFav = this.isFavorite(itemId);

      if (isFav) {
        // Remove from favorites
        const { error } = await this.supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('item_id', itemId);

        if (error) throw error;

        this.favorites.delete(itemId);
        console.log(`Removed favorite: ${itemId}`);
        return false;
      } else {
        // Add to favorites
        const { error } = await this.supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            item_id: itemId,
            item_type: itemType
          });

        if (error) throw error;

        this.favorites.add(itemId);
        console.log(`Added favorite: ${itemId}`);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Error saving favorite. Please try again.');
      return this.isFavorite(itemId);
    }
  }

  async getFavoritesByType(type) {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await this.supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('item_type', type)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  async getAllFavorites() {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) return { frequencies: [], baths: [], custom: [] };

      const { data, error } = await this.supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const favorites = data || [];
      return {
        frequencies: favorites.filter(f => f.item_type === 'frequency'),
        baths: favorites.filter(f => f.item_type === 'bath'),
        custom: favorites.filter(f => f.item_type === 'custom')
      };
    } catch (error) {
      console.error('Error getting all favorites:', error);
      return { frequencies: [], baths: [], custom: [] };
    }
  }

  getFavoriteCount() {
    return this.favorites.size;
  }

  clear() {
    this.favorites.clear();
  }
}

// Export for browser
if (typeof window !== 'undefined') {
  window.FavoritesManager = FavoritesManager;
}

// Export for Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FavoritesManager;
}