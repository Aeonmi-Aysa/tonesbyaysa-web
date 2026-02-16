#!/usr/bin/env node

/**
 * Inject environment variables at build time
 * Creates _config.js that makes environment variables available to the frontend
 * This runs during Netlify build process BEFORE deployment
 */

const fs = require('fs');
const path = require('path');

// Create JavaScript file (not HTML)
const jsContent = `// Environment variables injected at build time
// DO NOT COMMIT THIS FILE - It's generated during build
window.ENV = {
  SUPABASE_URL: '${process.env.SUPABASE_URL || 'https://your-project.supabase.co'}',
  SUPABASE_ANON_KEY: '${process.env.SUPABASE_ANON_KEY || 'your-anon-key-here'}',
  STRIPE_PUBLISHABLE_KEY: '${process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_your_test_key_here'}'
};

console.log('✅ Environment loaded:', {
  hasSupabaseUrl: !!window.ENV.SUPABASE_URL,
  hasSupabaseKey: !!window.ENV.SUPABASE_ANON_KEY,
  hasStripeKey: !!window.ENV.STRIPE_PUBLISHABLE_KEY
});
`;

// Write to _config.js at project root
const configPath = path.join(__dirname, '..', '_config.js');
fs.writeFileSync(configPath, jsContent, 'utf8');

console.log('✅ Environment variables injected into _config.js');
console.log('📝 Variables set:');
console.log('  - SUPABASE_URL:', process.env.SUPABASE_URL ? '✓' : '✗ (using placeholder)');
console.log('  - SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✓' : '✗ (using placeholder)');
console.log('  - STRIPE_PUBLISHABLE_KEY:', process.env.STRIPE_PUBLISHABLE_KEY ? '✓' : '✗ (using placeholder)');
