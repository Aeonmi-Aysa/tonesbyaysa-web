#!/usr/bin/env node
/**
 * COMPLETE FIX FOR NETLIFY SECRETS SCANNER FAILURES
 * 
 * This script:
 * 1. Removes ALL hardcoded Supabase keys
 * 2. Fixes incomplete SUPABASE_ANON_KEY declarations
 * 3. Replaces with window.ENV runtime loading
 * 4. Removes hardcoded Stripe keys
 * 5. Fixes admin.html special case
 */

const fs = require('fs');
const path = require('path');

// ALL files that need fixing
const filesToFix = [
  'app.html',
  'signin.html',
  'login.html',
  'profile.html',
  'premium-packages.html',
  'reset-password.html',
  'reset-password-confirm.html',
  'admin.html',
  'index.html'
];

console.log('🔧 Starting complete secrets removal...\n');

let totalFixed = 0;

filesToFix.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${file} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Fix incomplete SUPABASE_ANON_KEY declarations (just the variable name on a line)
  const incompletePattern = /^\s*const\s+SUPABASE_ANON_KEY\s*=\s*['"]?eyJ[A-Za-z0-9_-]*\.eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*['"]?\s*;?\s*$/gm;
  if (incompletePattern.test(content)) {
    content = content.replace(
      incompletePattern,
      "const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY || '';"
    );
    modified = true;
    console.log(`  ✅ Fixed incomplete SUPABASE_ANON_KEY in ${file}`);
  }

  // 2. Fix any hardcoded Supabase anon keys (full JWT tokens)
  const hardcodedKeyPattern = /const\s+SUPABASE_ANON_KEY\s*=\s*['"]eyJ[A-Za-z0-9_-]*\.eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*['"]/g;
  if (hardcodedKeyPattern.test(content)) {
    content = content.replace(
      hardcodedKeyPattern,
      "const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY || ''"
    );
    modified = true;
    console.log(`  ✅ Removed hardcoded SUPABASE_ANON_KEY in ${file}`);
  }

  // 3. Fix hardcoded Supabase URLs
  const hardcodedUrlPattern = /const\s+SUPABASE_URL\s*=\s*['"]https:\/\/qdnijmpcedgrpalnlojp\.supabase\.co['"]/g;
  if (hardcodedUrlPattern.test(content)) {
    content = content.replace(
      hardcodedUrlPattern,
      "const SUPABASE_URL = window.ENV?.SUPABASE_URL || 'https://your-project.supabase.co'"
    );
    modified = true;
    console.log(`  ✅ Removed hardcoded SUPABASE_URL in ${file}`);
  }

  // 4. Fix hardcoded Stripe publishable keys
  const stripeKeyPattern = /const\s+STRIPE_(?:KEY|PUBLISHABLE_KEY)\s*=\s*['"]pk_live_[A-Za-z0-9]*['"]/g;
  if (stripeKeyPattern.test(content)) {
    content = content.replace(
      stripeKeyPattern,
      "const STRIPE_PUBLISHABLE_KEY = window.ENV?.STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'"
    );
    modified = true;
    console.log(`  ✅ Removed hardcoded STRIPE_KEY in ${file}`);
  }

  // 5. Fix standalone SUPABASE_ANON_KEY lines (incomplete declarations)
  const standalonePattern = /^\s*SUPABASE_ANON_KEY\s*$/gm;
  if (standalonePattern.test(content)) {
    content = content.replace(standalonePattern, '');
    modified = true;
    console.log(`  ✅ Removed standalone SUPABASE_ANON_KEY references in ${file}`);
  }

  // 6. Fix inline Supabase client initialization with hardcoded keys
  const clientInitPattern = /supabase\.createClient\(\s*['"]https:\/\/qdnijmpcedgrpalnlojp\.supabase\.co['"],\s*['"]eyJ[A-Za-z0-9_-]*\.eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*['"]\s*\)/g;
  if (clientInitPattern.test(content)) {
    content = content.replace(
      clientInitPattern,
      "supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)"
    );
    modified = true;
    console.log(`  ✅ Fixed inline supabase.createClient() with hardcoded values in ${file}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFixed++;
    console.log(`  💾 Saved ${file}\n`);
  } else {
    console.log(`  ⏭️  No changes needed in ${file}\n`);
  }
});

console.log(`\n✨ Complete! Fixed ${totalFixed} files\n`);
console.log('📋 NEXT STEPS:\n');
console.log('1. Verify _config.js exists and loads window.ENV properly');
console.log('2. Set environment variables in Netlify Dashboard:');
console.log('   - SUPABASE_URL');
console.log('   - SUPABASE_ANON_KEY');
console.log('   - STRIPE_PUBLISHABLE_KEY');
console.log('   - STRIPE_SECRET_KEY');
console.log('   - STRIPE_WEBHOOK_SECRET');
console.log('   - SUPABASE_SERVICE_ROLE_KEY\n');
console.log('3. Commit and push changes');
console.log('4. Netlify will inject variables via scripts/inject-env.js during build\n');
console.log('🎉 All secrets removed from source code!');
