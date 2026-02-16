const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Use service role key if available, fallback to anon key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(
  process.env.SUPABASE_URL,
  supabaseKey
);

exports.handler = async (event) => {
  console.log('[create-payment] Request method:', event.httpMethod);

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { tierId, userId, email, priceId, isTrialStart } = JSON.parse(event.body);

    console.log('[create-payment] Request:', { tierId, userId, email, isTrialStart });

    // Get or create Stripe customer
    let customer;
    
    // Check if user already has a Stripe customer ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (profile?.stripe_customer_id) {
      customer = await stripe.customers.retrieve(profile.stripe_customer_id);
    } else {
      // Create new customer
      customer = await stripe.customers.create({
        email,
        metadata: { supabase_user_id: userId }
      });

      // Save customer ID to Supabase
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customer.id })
        .eq('id', userId);
    }

    // Determine the price ID based on tier
    let finalPriceId = priceId;
    if (!finalPriceId) {
      if (tierId === 'weekly' || tierId === 'trial') {
        finalPriceId = process.env.STRIPE_PRICE_WEEKLY;
      } else if (tierId === 'lifetime') {
        finalPriceId = process.env.STRIPE_PRICE_LIFETIME;
      }
    }

    // For weekly subscription (including trial)
    if (tierId === 'weekly' || tierId === 'trial') {
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: finalPriceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        trial_period_days: isTrialStart ? 7 : 0,
        metadata: {
          userId,
          tier: 'weekly'
        }
      });

      const paymentIntent = subscription.latest_invoice.payment_intent;

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          clientSecret: paymentIntent.client_secret,
          subscriptionId: subscription.id,
          paymentIntentId: paymentIntent.id,
          customerId: customer.id
        })
      };
    } 
    // For lifetime (one-time payment)
    else if (tierId === 'lifetime') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 6999, // $69.99 in cents
        currency: 'usd',
        customer: customer.id,
        setup_future_usage: 'off_session',
        metadata: {
          userId,
          tier: 'lifetime'
        }
      });

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          customerId: customer.id
        })
      };
    }

    throw new Error('Invalid tier');

  } catch (error) {
    console.error('[create-payment] Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: error.message,
        details: 'Failed to create payment intent'
      })
    };
  }
};
