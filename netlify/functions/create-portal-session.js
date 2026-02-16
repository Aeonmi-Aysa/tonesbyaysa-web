/**
 * CREATE STRIPE CUSTOMER PORTAL SESSION (For Web)
 * 
 * Creates a Stripe Customer Portal session for managing subscriptions
 * Allows users to cancel, update payment methods, etc.
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Use service role key for admin operations
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { userId, returnUrl } = JSON.parse(event.body);

    console.log('[Customer Portal] Creating session for user:', userId);

    // Get Stripe customer ID from Supabase
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('id', userId)
      .single();

    if (error || !profile) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' })
      };
    }

    if (!profile.stripe_customer_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No Stripe customer found. Please make a purchase first.' })
      };
    }

    console.log('[Customer Portal] Customer ID:', profile.stripe_customer_id);

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: returnUrl || `${event.headers.origin}/profile`,
    });

    console.log('[Customer Portal] ✅ Session created');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        url: session.url
      })
    };

  } catch (error) {
    console.error('[Customer Portal] ❌ Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: error.message || 'Failed to create portal session'
      })
    };
  }
};
