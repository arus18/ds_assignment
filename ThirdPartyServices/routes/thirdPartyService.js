const express = require('express');
const router = express.Router();

router.post('/delivery', async (req, res) => {
  // Get order details from request body
  const { orderId, deliveryService } = req.body;

  // Simulate random delay in delivery processing
  const delay = Math.floor(Math.random() * 50000) + 10000; // Random delay between 10-60 seconds
  await new Promise(resolve => setTimeout(resolve, delay));

  // Simulate random delivery success or failure
  const success = Math.random() < 0.5; // Random boolean value
  const status = success ? 'delivered' : 'failed';

  // Create delivery object
  const delivery = {
    orderId,
    deliveryService,
    status,
    timestamp: new Date()
  };

  // Return delivery response
  res.json(delivery);
});

router.post('/payment', async (req, res) => {
  // Get payment details from request body
  const { orderId, vendor, amount } = req.body;

  // Simulate random delay in payment processing
  const delay = Math.floor(Math.random() * 50000) + 10000; // Random delay between 10-60 seconds
  await new Promise(resolve => setTimeout(resolve, delay));

  // Simulate random payment success or failure
  const success = Math.random() < 0.5; // Random boolean value
  const status = success ? 'success' : 'failed';

  // Create payment object
  const payment = {
    orderId,
    vendor,
    amount,
    status,
    timestamp: new Date()
  };

  // Return payment response
  res.json(payment);
});

module.exports = router;
