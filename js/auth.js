// auth.js - Authentication helpers exposed globally for browser/Electron use

(function attachHealToneAuth(windowObj) {
  if (!windowObj) {
    return;
  }

  if (!windowObj.supabaseClient && !windowObj.supabase) {
    console.warn('Supabase client not found. Ensure Supabase is initialized in HEAD');
    return;
  }

  const client = windowObj.supabaseClient || windowObj.supabase;

  async function signUp(email, password, displayName) {
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });
    if (error) throw error;
    return data;
  }

  async function signIn(email, password) {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    const { error } = await client.auth.signOut();
    if (error) throw error;
  }

  async function getSession() {
    const { data: { session }, error } = await client.auth.getSession();
    if (error) throw error;
    return session;
  }

  function onAuthStateChange(callback) {
    return client.auth.onAuthStateChange(callback);
  }

  windowObj.HealToneAuth = {
    signUp,
    signIn,
    signOut,
    getSession,
    onAuthStateChange,
  };
})(window);