/**
 * CREATE STRIPE CHECKOUT SESSION (For Web)
 * 
 * Creates a Stripe Checkout session and returns the URL for redirect
 * This is the web-compatible alternative to Payment Sheet
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Use service role key for admin operations
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Price IDs (same as mobile)
const PRICE_IDS = {
  weekly: 'price_1SaZUKIJONruX42X6xjcLcMK',
  lifetime: 'price_1SaZa2IJONruX42XTjv6rInh'
};

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { tierId, userId, email, successUrl, cancelUrl } = JSON.parse(event.body);

    console.log('[Create Checkout] Creating session for:', { tierId, userId, email });

    // Validate tier
    if (!['weekly', 'lifetime'].includes(tierId)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid tier. Must be weekly or lifetime.' })
      };
    }

    // Get or create Stripe customer
    let customer;
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (profile?.stripe_customer_id) {
      customer = await stripe.customers.retrieve(profile.stripe_customer_id);
    } else {
      customer = await stripe.customers.create({
        email,
        metadata: { supabase_user_id: userId }
      });

      // Save customer ID to profile
      await supabaseAdmin
        .from('profiles')
        .update({ stripe_customer_id: customer.id })
        .eq('id', userId);
    }

    console.log('[Create Checkout] Customer:', customer.id);

    // Determine mode and line items
    const mode = tierId === 'weekly' ? 'subscription' : 'payment';
    const priceId = PRICE_IDS[tierId];

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        }
      ],
      success_url: successUrl || `${event.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${event.headers.origin}/pricing`,
      metadata: {
        user_id: userId,
        tier_id: tierId
      },
      // For subscriptions, configure trial if needed
      ...(mode === 'subscription' && {
        subscription_data: {
          metadata: {
            user_id: userId,
            tier_id: tierId
          }
        }
      })
    });

    console.log('[Create Checkout] ✅ Session created:', session.id);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url,
        customerId: customer.id
      })
    };

  } catch (error) {
    console.error('[Create Checkout] ❌ Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: error.message || 'Failed to create checkout session'
      })
    };
  }
};
