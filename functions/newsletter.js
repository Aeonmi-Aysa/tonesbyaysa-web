// newsletter.js - Netlify function for email newsletter subscription

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    // Here you would integrate with your email service (e.g., Mailchimp, SendGrid)
    // For now, just log the subscription
    console.log(`New newsletter subscription: ${email}`);

    // TODO: Add to Supabase or email service

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully subscribed to newsletter' }),
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};