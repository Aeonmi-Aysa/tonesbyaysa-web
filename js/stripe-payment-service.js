// stripe-payment-service.js - Stripe payment integration for browser app
// Handles payment processing and subscription management

const StripePaymentService = {
  stripe: null,
  publishableKey: null,
  supabase: null,

  // Initialize Stripe
  init: function(stripePublishableKey, supabaseClient) {
    this.publishableKey = stripePublishableKey || process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
    this.supabase = supabaseClient;

    if (!this.publishableKey) {
      console.error('❌ Stripe publishable key not configured');
      return false;
    }

    // Load Stripe.js
    if (!window.Stripe) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.onload = () => {
        this.stripe = window.Stripe(this.publishableKey);
        console.log('✅ Stripe initialized');
      };
      document.head.appendChild(script);
    } else {
      this.stripe = window.Stripe(this.publishableKey);
      console.log('✅ Stripe initialized');
    }

    return true;
  },

  // Get available products
  async getProducts() {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/stripe/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sb_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const products = await response.json();
      console.log('📦 Products loaded:', products);
      return products;
    } catch (err) {
      console.error('Error fetching products:', err);
      return [];
    }
  },

  // Create checkout session
  async createCheckoutSession(productId, tier) {
    if (!this.supabase) {
      console.error('Supabase not initialized');
      return null;
    }

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Call backend to create session
      const response = await fetch(process.env.REACT_APP_API_URL + '/stripe/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sb_token')}`
        },
        body: JSON.stringify({
          priceId: productId,
          customerId: user.id,
          email: user.email,
          tier: tier
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      console.log('✅ Checkout session created:', sessionId);

      return sessionId;
    } catch (err) {
      console.error('Error creating checkout session:', err);
      return null;
    }
  },

  // Redirect to Stripe checkout
  async redirectToCheckout(sessionId) {
    if (!this.stripe) {
      console.error('Stripe not initialized');
      return false;
    }

    try {
      const { error } = await this.stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (error) {
        console.error('❌ Redirect to checkout failed:', error);
        return false;
      }

      console.log('✅ Redirected to Stripe checkout');
      return true;
    } catch (err) {
      console.error('Error redirecting to checkout:', err);
      return false;
    }
  },

  // Process payment (complete checkout flow)
  async processPayment(productId, tier) {
    try {
      console.log('💳 Starting payment for tier:', tier);

      // Create session
      const sessionId = await this.createCheckoutSession(productId, tier);
      if (!sessionId) {
        throw new Error('Failed to create session');
      }

      // Redirect to checkout
      const success = await this.redirectToCheckout(sessionId);
      return success;
    } catch (err) {
      console.error('Error processing payment:', err);
      return false;
    }
  },

  // Get customer portal URL
  async getCustomerPortalUrl() {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(process.env.REACT_APP_API_URL + '/stripe/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sb_token')}`
        },
        body: JSON.stringify({
          userId: user.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get portal URL');
      }

      const { url } = await response.json();
      console.log('✅ Customer portal URL:', url);
      return url;
    } catch (err) {
      console.error('Error getting portal URL:', err);
      return null;
    }
  },

  // Handle webhook event (called from backend)
  handleWebhookEvent: function(event) {
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('✅ Checkout completed:', event.data.object);
        // Update user subscription in Supabase via webhook
        return true;

      case 'customer.subscription.updated':
        console.log('✅ Subscription updated:', event.data.object);
        return true;

      case 'customer.subscription.deleted':
        console.log('⚠️ Subscription cancelled:', event.data.object);
        return true;

      case 'invoice.paid':
        console.log('✅ Invoice paid:', event.data.object);
        return true;

      default:
        console.log('ℹ️ Unhandled event type:', event.type);
        return false;
    }
  },

  // Verify payment status
  async verifyPayment(sessionId) {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/stripe/session/${sessionId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('sb_token')}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }

      const session = await response.json();
      console.log('✅ Payment verified:', session);

      return {
        paid: session.payment_status === 'paid',
        status: session.payment_status,
        customer: session.customer,
        amount: session.amount_total
      };
    } catch (err) {
      console.error('Error verifying payment:', err);
      return null;
    }
  },

  // Get subscription details
  async getSubscriptionDetails() {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) return null;

      const response = await fetch(
        process.env.REACT_APP_API_URL + `/stripe/subscription/${user.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('sb_token')}`
          }
        }
      );

      if (!response.ok) {
        console.log('No subscription found');
        return null;
      }

      const subscription = await response.json();
      console.log('✅ Subscription details:', subscription);

      return {
        id: subscription.id,
        status: subscription.status,
        items: subscription.items.data.map(item => ({
          priceId: item.price.id,
          productId: item.price.product,
          amount: item.price.unit_amount / 100,
          interval: item.price.recurring.interval
        })),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end
      };
    } catch (err) {
      console.error('Error fetching subscription:', err);
      return null;
    }
  },

  // Cancel subscription
  async cancelSubscription() {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      const response = await fetch(
        process.env.REACT_APP_API_URL + `/stripe/subscription/cancel`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('sb_token')}`
          },
          body: JSON.stringify({ userId: user.id })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      console.log('✅ Subscription cancelled');
      return true;
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      return false;
    }
  },

  // Create card element for embedded payment
  async createCardElement(elementId) {
    if (!this.stripe) {
      console.error('Stripe not initialized');
      return null;
    }

    try {
      const elements = this.stripe.elements();
      const cardElement = elements.create('card');
      cardElement.mount('#' + elementId);
      console.log('✅ Card element created');
      return { cardElement, elements };
    } catch (err) {
      console.error('Error creating card element:', err);
      return null;
    }
  },

  // Confirm payment with card
  async confirmPayment(clientSecret, cardElement) {
    if (!this.stripe) {
      console.error('Stripe not initialized');
      return null;
    }

    try {
      const result = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement
        }
      });

      if (result.error) {
        console.error('❌ Payment error:', result.error);
        return null;
      }

      console.log('✅ Payment confirmed:', result.paymentIntent);
      return result.paymentIntent;
    } catch (err) {
      console.error('Error confirming payment:', err);
      return null;
    }
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StripePaymentService;
}
