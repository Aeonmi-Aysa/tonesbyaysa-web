// profile-service.js - User profile and subscription management
// Syncs with Supabase profiles table for unified mobile/browser experience

const ProfileService = {
  // Initialize Supabase client (must be called before using service)
  supabase: null,

  init: function(supabaseClient) {
    this.supabase = supabaseClient;
    console.log('ProfileService initialized');
  },

  // Get current user profile
  async getProfile() {
    if (!this.supabase) {
      console.error('ProfileService not initialized. Call init() first.');
      return null;
    }

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) {
        console.log('No authenticated user');
        return null;
      }

      // Fetch profile from database
      const { data, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Profile fetch error:', err);
      return null;
    }
  },

  // Create or update user profile
  async saveProfile(updates) {
    if (!this.supabase) {
      console.error('ProfileService not initialized');
      return null;
    }

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }

      const profileData = {
        id: user.id,
        email: user.email,
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await this.supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' })
        .select()
        .single();

      if (error) {
        console.error('Error saving profile:', error);
        return null;
      }

      console.log('Profile saved successfully');
      return data;
    } catch (err) {
      console.error('Profile save error:', err);
      return null;
    }
  },

  // Check if user has access to premium features
  async isPremium() {
    const profile = await this.getProfile();
    
    if (!profile) return false;
    
    return profile.subscription_tier === 'weekly' || 
           profile.subscription_tier === 'lifetime';
  },

  // Get subscription tier level (0=free, 1=weekly, 2=lifetime)
  async getSubscriptionTierLevel() {
    const profile = await this.getProfile();
    
    if (!profile) return 0;
    
    const tiers = {
      'free': 0,
      'weekly': 1,
      'lifetime': 2
    };
    
    return tiers[profile.subscription_tier] || 0;
  },

  // Check if subscription is active
  async isSubscriptionActive() {
    const profile = await this.getProfile();
    
    if (!profile) return false;
    
    return profile.subscription_status === 'active' &&
           (profile.subscription_tier === 'weekly' || profile.subscription_tier === 'lifetime');
  },

  // Update subscription after payment (called by webhook)
  async updateSubscription(tier, status = 'active', paymentProvider = 'stripe', providerId = null) {
    try {
      const updates = {
        subscription_tier: tier,
        subscription_status: status,
        payment_provider: paymentProvider
      };

      if (paymentProvider === 'stripe' && providerId) {
        updates.stripe_customer_id = providerId;
      } else if (paymentProvider === 'revenuecat' && providerId) {
        updates.revenuecat_customer_id = providerId;
      }

      return await this.saveProfile(updates);
    } catch (err) {
      console.error('Error updating subscription:', err);
      return null;
    }
  },

  // Get user stats
  async getStats() {
    if (!this.supabase) {
      console.error('ProfileService not initialized');
      return null;
    }

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) return null;

      const { data, error } = await this.supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.log('No stats yet for user');
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error fetching stats:', err);
      return null;
    }
  },

  // Update user stats after session
  async updateStats(updates) {
    if (!this.supabase) {
      console.error('ProfileService not initialized');
      return null;
    }

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await this.supabase
        .from('user_stats')
        .upsert({
          user_id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' })
        .select()
        .single();

      if (error) {
        console.error('Error updating stats:', error);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error saving stats:', err);
      return null;
    }
  },

  // Get available frequencies based on subscription
  async getAvailableFrequencies() {
    const tierLevel = await this.getSubscriptionTierLevel();
    
    // 0 = free (basic frequencies only)
    // 1 = weekly (most frequencies)
    // 2 = lifetime (all frequencies)
    
    if (tierLevel === 0) {
      return 'free';
    } else if (tierLevel === 1) {
      return 'weekly';
    } else {
      return 'lifetime';
    }
  },

  // Logout user
  async logout() {
    if (!this.supabase) {
      console.error('ProfileService not initialized');
      return false;
    }

    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        return false;
      }
      console.log('Logged out successfully');
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      return false;
    }
  },

  // Update profile avatar
  async updateAvatar(avatarUrl) {
    return await this.saveProfile({ avatar_url: avatarUrl });
  },

  // Update display name
  async updateDisplayName(fullName) {
    return await this.saveProfile({ full_name: fullName });
  },

  // Get user's favorites
  async getFavorites() {
    if (!this.supabase) return [];

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) return [];

      const { data, error } = await this.supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.log('No favorites yet');
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching favorites:', err);
      return [];
    }
  },

  // Add favorite (supports frequencies, baths, and stacks)
  async addFavorite(itemId, itemType, itemName, itemData = null) {
    if (!this.supabase) return false;

    // Validate item type
    const validTypes = ['frequency', 'bath', 'stack'];
    if (!validTypes.includes(itemType)) {
      console.error(`Invalid item type: ${itemType}. Must be one of: ${validTypes.join(', ')}`);
      return false;
    }

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) throw new Error('Not authenticated');

      const favoriteData = {
        user_id: user.id,
        item_id: itemId,
        item_type: itemType, // 'frequency', 'bath', 'stack'
        item_name: itemName,
        created_at: new Date().toISOString()
      };

      // Store full item data for offline access or quick reference
      if (itemData) {
        favoriteData.item_data = itemData;
      }

      const { error } = await this.supabase
        .from('favorites')
        .insert(favoriteData);

      if (error) {
        console.error('Error adding favorite:', error);
        return false;
      }

      console.log(`✅ Added ${itemType} "${itemName}" to favorites`);
      return true;
    } catch (err) {
      console.error('Error:', err);
      return false;
    }
  },

  // Remove favorite
  async removeFavorite(itemId) {
    if (!this.supabase) return false;

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) throw new Error('Not authenticated');

      const { error } = await this.supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('item_id', itemId);

      if (error) {
        console.error('Error removing favorite:', error);
        return false;
      }

      console.log('Removed from favorites');
      return true;
    } catch (err) {
      console.error('Error:', err);
      return false;
    }
  },

  // Check if item is favorited
  async isFavorite(itemId) {
    const favorites = await this.getFavorites();
    return favorites.some(f => f.item_id === itemId);
  },

  // Get favorite frequencies only
  async getFavoriteFrequencies() {
    const favorites = await this.getFavorites();
    return favorites.filter(f => f.item_type === 'frequency');
  },

  // Get favorite baths only
  async getFavoriteBaths() {
    const favorites = await this.getFavorites();
    return favorites.filter(f => f.item_type === 'bath');
  },

  // Get favorite stacks only
  async getFavoriteStacks() {
    const favorites = await this.getFavorites();
    return favorites.filter(f => f.item_type === 'stack');
  },

  // Get favorites by type
  async getFavoritesByType(itemType) {
    const validTypes = ['frequency', 'bath', 'stack'];
    if (!validTypes.includes(itemType)) {
      console.error(`Invalid type: ${itemType}`);
      return [];
    }
    const favorites = await this.getFavorites();
    return favorites.filter(f => f.item_type === itemType);
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProfileService;
}
