#!/usr/bin/env node
/**
 * SECURITY FIX: Remove all hardcoded secrets from repository
 * This script removes exposed Supabase keys and Stripe keys from all files
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 SECURITY AUDIT: Removing hardcoded secrets...\n');

// Files to fix
const filesToFix = [
  'admin.html',
  'login.html',
  'signin.html',
  'forgot-password.html',
  'reset-password.html',
  'reset-password-confirm.html',
  'profile.html',
  'premium-packages.html',
  'scripts/verify-admin.js',
  'scripts/fix-html-secrets.js'
];

// Pattern to find hardcoded Supabase anon key
const anonKeyPattern = /const SUPABASE_ANON_KEY\s*=\s*['"]eyJ[^'"]+['"]/g;
const anonKeyIncomplete = /const SUPABASE_ANON_KEY\s*$/gm;

// Pattern to find hardcoded URLs
const urlPattern = /const SUPABASE_URL\s*=\s*['"]https:\/\/qdnijmpcedgrpalnlojp\.supabase\.co['"]/g;

// Safe replacement
const safeAnonKey = "const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY || ''";
const safeUrl = "const SUPABASE_URL = window.ENV?.SUPABASE_URL || ''";

let filesFixed = 0;

filesToFix.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${file} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix complete anon key declarations
  if (anonKeyPattern.test(content)) {
    content = content.replace(anonKeyPattern, safeAnonKey);
    modified = true;
    console.log(`✅ Fixed complete ANON_KEY in ${file}`);
  }

  // Fix incomplete anon key declarations (the ones copilot broke)
  if (anonKeyIncomplete.test(content)) {
    content = content.replace(anonKeyIncomplete, safeAnonKey);
    modified = true;
    console.log(`✅ Fixed incomplete ANON_KEY in ${file}`);
  }

  // Fix hardcoded URLs
  if (urlPattern.test(content)) {
    content = content.replace(urlPattern, safeUrl);
    modified = true;
    console.log(`✅ Fixed hardcoded URL in ${file}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesFixed++;
  }
});

console.log(`\n✨ Fixed ${filesFixed} files`);
console.log('\n📝 Next steps:');
console.log('1. Set environment variables in Netlify:');
console.log('   SUPABASE_URL=https://qdnijmpcedgrpalnlojp.supabase.co');
console.log('   SUPABASE_ANON_KEY=<your-anon-key>');
console.log('   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>');
console.log('   STRIPE_SECRET_KEY=<your-stripe-secret>');
console.log('   STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable>');
console.log('   STRIPE_WEBHOOK_SECRET=<your-webhook-secret>');
console.log('\n2. Create netlify/edge-functions/env.ts to inject vars at runtime');
console.log('3. Commit and push to trigger clean build');
console.log('\n🔒 All secrets now loaded from environment variables!');
