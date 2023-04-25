const { sendEmailMiddleware } = require('../middleware/notification');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const router = express.Router();
const Config = require('../config');
const redis = require('redis');
const port = 3000;
const redisClient = redis.createClient();


// Middleware
app.use(bodyParser.json());

// Endpoints
app.get('/orders', async (req, res) => {
  try {
    const response = await axios.get(`${Config.ORDER_SERVICE}/orders`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

app.get('/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const response = await axios.get(`${Config.ORDER_SERVICE}/orders/${orderId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const response = await axios.post(`${Config.ORDER_SERVICE}/orders`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

app.patch('/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const response = await axios.patch(`${Config.ORDER_SERVICE}/orders/${orderId}`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

app.delete('/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const response = await axios.delete(`${Config.ORDER_SERVICE}/orders/${orderId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

app.post('/confirm-order', (req, res) => {
  const orderData = req.body;

  // Process order confirmation request
  // Check order is confirmed or not in here
  

  // Determine payment type and send payment request
  if (orderData.paymentType === 'cash') {
    const deliveryRequest = { orderId: orderData.orderId };
    const deliveryRequestString = JSON.stringify(deliveryRequest);
    redisClient.publish('delivery-request', deliveryRequestString);
  } else {
    const paymentRequest = { orderId: orderData.orderId };
    const paymentRequestString = JSON.stringify(paymentRequest);
    redisClient.publish('payment-request', paymentRequestString);
  }

  // Subscribe to delivery response
  subscriber.on('message', (channel, message) => {
    if (channel === 'delivery-response') {
      const deliveryData = JSON.parse(message);
      // Process delivery response and send notification
      const deliveryMessage = deliveryData.message;
      
      if (deliveryMessage === 'Delivery successful') {
        sendEmailMiddleware({ params: { emailType: 'deliverySuccess' }, body: { buyerEmail: deliveryData.buyerEmail } });
      } else {
        sendEmailMiddleware({ params: { emailType: 'deliveryFailed' }, body: { buyerEmail: deliveryData.buyerEmail } });
      }
    }
    if (channel === 'payment-response') {
      const paymentData = JSON.parse(message);
      // Process payment response and send notification
      const paymentMessage = paymentData.message;
  
      if (paymentMessage === 'Payment successful') {
        sendEmailMiddleware({ params: { emailType: 'paymentSuccess' }, body: { buyerEmail: paymentData.buyerEmail } });
        const deliveryRequest = { orderId: paymentData.orderId };
        const deliveryRequestString = JSON.stringify(deliveryRequest);
        redisClient.publish('delivery-request', deliveryRequestString);
      } else {
        sendEmailMiddleware({ params: { emailType: 'paymentFailed' }, body: { buyerEmail: paymentData.buyerEmail } });
      }
    }
  });
  
  redisClient.subscribe('delivery-response');
  redisClient.subscribe('payment-response');

  res.status(200).send('Order confirmed successfully');
});


module.exports = router;