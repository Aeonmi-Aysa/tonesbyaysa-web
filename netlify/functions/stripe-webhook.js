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
    const sig = event.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // Verify webhook signature
    let stripeEvent;
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        event.body,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error('[stripe-webhook] Signature verification failed:', err.message);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` })
      };
    }

    console.log('[stripe-webhook] Event received:', stripeEvent.type);

    // Handle different event types
    switch (stripeEvent.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.log('[stripe-webhook] No userId in metadata, skipping');
          break;
        }

        // Update subscription in Supabase
        await supabase
          .from('profiles')
          .update({
            subscription_tier: 'weekly',
            subscription_status: subscription.status,
            subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);

        console.log('[stripe-webhook] ✅ Subscription updated for user:', userId);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object;
        let userId = subscription.metadata?.userId;

        if (!userId) {
          // Try to find user by customer ID
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('stripe_customer_id', subscription.customer)
            .single();

          if (profile) {
            userId = profile.id;
          }
        }

        if (userId) {
          await supabase
            .from('profiles')
            .update({
              subscription_tier: 'free',
              subscription_status: 'cancelled',
              subscription_expires_at: null,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);

          console.log('[stripe-webhook] ✅ Subscription cancelled for user:', userId);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = stripeEvent.data.object;
        console.log('[stripe-webhook] Payment succeeded for invoice:', invoice.id);
        // Payment success is handled by subscription events
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = stripeEvent.data.object;
        const customerId = invoice.customer;

        // Find user and mark payment as failed
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'past_due',
              updated_at: new Date().toISOString()
            })
            .eq('id', profile.id);

          console.log('[stripe-webhook] ⚠️ Payment failed for user:', profile.id);
        }
        break;
      }

      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        const userId = session.metadata?.userId;
        const tier = session.metadata?.tier || 'weekly';

        if (userId) {
          await supabase
            .from('profiles')
            .update({
              subscription_tier: tier,
              subscription_status: 'active',
              stripe_customer_id: session.customer,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);

          console.log('[stripe-webhook] ✅ Checkout completed for user:', userId, 'tier:', tier);
        }
        break;
      }

      default:
        console.log('[stripe-webhook] Unhandled event type:', stripeEvent.type);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ received: true })
    };

  } catch (error) {
    console.error('[stripe-webhook] Error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        details: 'Webhook processing failed'
      })
    };
  }
};
