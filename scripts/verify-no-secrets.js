#!/usr/bin/env node
/**
 * FINAL SECURITY VERIFICATION
 * Scans entire project for any remaining hardcoded secrets
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Starting final security scan...\n');

const filesToCheck = [
  'app.html',
  'index.html',
  'login.html',
  'signin.html',
  'admin.html',
  'profile.html',
  'reset-password.html',
  'reset-password-confirm.html',
  'premium-packages.html',
  'pricing.html'
];

// Dangerous patterns to detect
const dangerousPatterns = [
  {
    name: 'Supabase JWT Token',
    regex: /eyJ[A-Za-z0-9_-]*\.eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*/g,
    severity: 'CRITICAL'
  },
  {
    name: 'Stripe Secret Key',
    regex: /sk_live_[A-Za-z0-9]{24,}/g,
    severity: 'CRITICAL'
  },
  {
    name: 'Hardcoded Supabase URL',
    regex: /['"]https:\/\/qdnijmpcedgrpalnlojp\.supabase\.co['"]/g,
    severity: 'WARNING'
  },
  {
    name: 'Hardcoded Stripe Publishable Key',
    regex: /pk_live_[A-Za-z0-9]{24,}/g,
    severity: 'HIGH'
  },
  {
    name: 'Incomplete SUPABASE_ANON_KEY declaration',
    regex: /^\s*SUPABASE_ANON_KEY\s*$/m,
    severity: 'ERROR'
  }
];

let totalIssues = 0;
let criticalIssues = 0;

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skip ${file} (not found)`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  let fileHasIssues = false;

  dangerousPatterns.forEach(pattern => {
    const matches = content.match(pattern.regex);
    if (matches && matches.length > 0) {
      if (!fileHasIssues) {
        console.log(`\n❌ ${file}:`);
        fileHasIssues = true;
      }
      
      console.log(`  [${pattern.severity}] ${pattern.name}: ${matches.length} occurrence(s)`);
      matches.forEach((match, i) => {
        const preview = match.length > 40 ? match.substring(0, 40) + '...' : match;
        console.log(`    ${i + 1}. ${preview}`);
      });
      
      totalIssues++;
      if (pattern.severity === 'CRITICAL') criticalIssues++;
    }
  });

  if (!fileHasIssues) {
    console.log(`✅ ${file} - Clean`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('FINAL REPORT');
console.log('='.repeat(60));

if (totalIssues === 0) {
  console.log('✅ ✅ ✅ ALL CLEAR! No secrets found in source code.');
  console.log('\n🎉 Safe to commit and deploy!');
  process.exit(0);
} else {
  console.log(`❌ Found ${totalIssues} potential security issue(s)`);
  console.log(`🚨 Critical issues: ${criticalIssues}`);
  console.log('\n⚠️  DO NOT COMMIT until all issues are resolved!');
  console.log('\nTo fix:');
  console.log('  1. Run: node scripts/complete-secrets-fix.js');
  console.log('  2. Review flagged files manually');
  console.log('  3. Run this script again to verify');
  process.exit(1);
}
