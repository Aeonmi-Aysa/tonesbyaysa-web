// admin.js - Admin functions for HealTone (attached to window)

(function attachHealToneAdmin(windowObj) {
  if (!windowObj) {
    return;
  }

  if (!windowObj.supabaseClient && !windowObj.supabase) {
    console.warn('Supabase client not found. Ensure Supabase is initialized in HEAD');
    return;
  }

  const client = windowObj.supabaseClient || windowObj.supabase;

  async function getAllUsers() {
    const { data, error } = await client
      .from('profiles')
      .select('*');
    if (error) throw error;
    return data;
  }

  async function getUserStats(userId) {
    const { data, error } = await client
      .from('user_stats')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }

  async function updateUserProfile(userId, updates) {
    const { data, error } = await client
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    if (error) throw error;
    return data;
  }

  async function getSystemStats() {
    const { data, error } = await client
      .from('user_stats')
      .select('*');
    if (error) throw error;

    const totalSessions = data.reduce((sum, stat) => sum + (stat.total_sessions || 0), 0);
    const totalMinutes = data.reduce((sum, stat) => sum + (stat.total_minutes || 0), 0);
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    const activeUsers = data.filter(stat => {
      if (!stat.last_session) return false;
      return new Date(stat.last_session).getTime() > Date.now() - THIRTY_DAYS;
    }).length;

    return {
      totalSessions,
      totalMinutes,
      activeUsers,
      totalUsers: data.length,
    };
  }

  windowObj.HealToneAdmin = {
    getAllUsers,
    getUserStats,
    updateUserProfile,
    getSystemStats,
  };
})(window);