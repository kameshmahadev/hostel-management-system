// Payment gateway integration using Stripe (demo)
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
  processPayment: async ({ amount, currency = 'usd', description }) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        description,
      });
      return { success: true, clientSecret: paymentIntent.client_secret };
    } catch (error) {
      console.error('Stripe payment error:', error.message);
      return { success: false, error: error.message };
    }
  }
};
