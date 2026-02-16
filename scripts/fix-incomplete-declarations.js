#!/usr/bin/env node
/**
 * Fix incomplete SUPABASE_ANON_KEY declarations in HTML files
 * Copilot left these as incomplete statements, causing Netlify secrets scanner to fail
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing incomplete secret declarations...\n');

const htmlFiles = [
  'signin.html',
  'reset-password.html',
  'reset-password-confirm.html',
  'profile.html',
  'premium-packages.html',
  'login.html',
  'forgot-password.html'
];

let fixedCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${file} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix incomplete ANON_KEY declaration (the line that ends with just "const SUPABASE_ANON_KEY")
  const incompletePattern = /const SUPABASE_ANON_KEY\s*$/gm;
  if (incompletePattern.test(content)) {
    content = content.replace(
      incompletePattern,
      "const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY || '';"
    );
    modified = true;
    console.log(`✅ Fixed incomplete ANON_KEY in ${file}`);
  }

  // Also fix any complete declarations that still have hardcoded values
  const hardcodedPattern = /const SUPABASE_ANON_KEY\s*=\s*['"]eyJ[^'"]+['"]/g;
  if (hardcodedPattern.test(content)) {
    content = content.replace(
      hardcodedPattern,
      "const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY || ''"
    );
    modified = true;
    console.log(`✅ Removed hardcoded ANON_KEY in ${file}`);
  }

  // Fix hardcoded URLs
  const urlPattern = /const SUPABASE_URL\s*=\s*['"]https:\/\/qdnijmpcedgrpalnlojp\.supabase\.co['"]/g;
  if (urlPattern.test(content)) {
    content = content.replace(
      urlPattern,
      "const SUPABASE_URL = window.ENV?.SUPABASE_URL || ''"
    );
    modified = true;
    console.log(`✅ Removed hardcoded URL in ${file}`);
  }

  // Fix hardcoded Stripe keys
  const stripePattern = /const STRIPE_KEY\s*=\s*['"]pk_(live|test)_[^'"]+['"]/g;
  if (stripePattern.test(content)) {
    content = content.replace(
      stripePattern,
      "const STRIPE_KEY = window.ENV?.STRIPE_PUBLISHABLE_KEY || ''"
    );
    modified = true;
    console.log(`✅ Removed hardcoded Stripe key in ${file}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
  } else {
    console.log(`✓ ${file} already clean`);
  }
});

console.log(`\n✨ Fixed ${fixedCount} files\n`);

if (fixedCount > 0) {
  console.log('📝 Next steps:');
  console.log('1. Verify edge function is deployed: netlify/edge-functions/inject-env.ts');
  console.log('2. Set environment variables in Netlify dashboard');
  console.log('3. Commit and push:');
  console.log('   git add .');
  console.log('   git commit -m "fix: Complete incomplete secret declarations"');
  console.log('   git push');
  console.log('\n✅ All secrets now loaded from environment variables!');
} else {
  console.log('✅ All files already clean!');
}
