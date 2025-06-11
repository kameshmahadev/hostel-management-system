// Payment gateway integration stub
// Integrate with Stripe, Razorpay, etc.

module.exports = {
  processPayment: async (paymentDetails) => {
    // TODO: Integrate with payment gateway
    console.log('Processing payment:', paymentDetails);
    return { success: true, transactionId: 'demo_txn_123' };
  }
};
