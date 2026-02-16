const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { paymentIntentId, tierId, userId } = JSON.parse(event.body);

    console.log('[confirm-payment] Request:', { paymentIntentId, tierId, userId });

    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check if payment succeeded
    if (paymentIntent.status !== 'succeeded') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: 'Payment not completed',
          status: paymentIntent.status
        })
      };
    }

    // Update user's subscription in Supabase
    const updateData = {
      subscription_tier: tierId === 'lifetime' ? 'lifetime' : 'weekly',
      subscription_status: 'active',
      updated_at: new Date().toISOString()
    };

    // For lifetime, no expiration
    // For weekly, webhook will set expiration
    if (tierId === 'lifetime') {
      updateData.subscription_expires_at = null;
    }

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (error) {
      console.error('[confirm-payment] Supabase error:', error);
      throw new Error('Failed to update subscription in database');
    }

    console.log('[confirm-payment] ✅ Payment confirmed, user upgraded to:', updateData.subscription_tier);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        tier: updateData.subscription_tier,
        message: 'Payment confirmed and subscription activated'
      })
    };

  } catch (error) {
    console.error('[confirm-payment] Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: error.message,
        details: 'Failed to confirm payment'
      })
    };
  }
};
