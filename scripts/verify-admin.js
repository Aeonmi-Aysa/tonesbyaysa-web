#!/usr/bin/env node

/**
 * Admin Setup Verification Script
 * 
 * This script:
 * 1. Verifies origin@aeonmi.ai has admin privileges
 * 2. Updates the account if needed
 * 3. Lists all admin users
 * 
 * REQUIRES ENVIRONMENT VARIABLES:
 * - SUPABASE_URL
 * - SUPABASE_ANON_KEY
 */

const { createClient } = require('@supabase/supabase-js');

// Load from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ ERROR: Missing required environment variables');
  console.error('Please set: SUPABASE_URL, SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function verifyAdminSetup() {
  console.log('🔍 Verifying admin setup for origin@aeonmi.ai...\n');

  try {
    // Check if user exists and has admin privileges
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'origin@aeonmi.ai')
      .single();

    if (error) {
      console.error('❌ Error querying database:', error.message);
      return;
    }

    if (!data) {
      console.log('⚠️  User origin@aeonmi.ai not found in profiles table');
      console.log('💡 User must sign up first at /login.html');
      return;
    }

    console.log('✅ User found:', data.email);
    console.log('   Admin status:', data.is_admin);
    console.log('   Subscription:', data.subscription_tier);
    console.log('   Status:', data.subscription_status);

    if (!data.is_admin || data.subscription_tier !== 'lifetime') {
      console.log('\n⚠️  Fixing admin privileges...');
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          is_admin: true,
          subscription_tier: 'lifetime',
          subscription_status: 'active'
        })
        .eq('email', 'origin@aeonmi.ai');

      if (updateError) {
        console.error('❌ Failed to update:', updateError.message);
      } else {
        console.log('✅ Admin privileges granted!');
      }
    } else {
      console.log('✅ Admin privileges confirmed!');
    }

    // List all admins
    console.log('\n📋 All admin users:');
    const { data: admins } = await supabase
      .from('profiles')
      .select('email, is_admin, subscription_tier')
      .eq('is_admin', true);

    if (admins && admins.length > 0) {
      admins.forEach(admin => {
        console.log(`   • ${admin.email} (${admin.subscription_tier})`);
      });
    } else {
      console.log('   No admins found');
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

verifyAdminSetup();
