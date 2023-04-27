const { sendEmailMiddleware } = require('../middleware/notification');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const router = express.Router();
const Config = require('../config');
const redis = require('redis');
const redisClient = redis.createClient('redis://localhost:6379');
const subscriber = redis.createClient('redis://localhost:6379');



// Middleware
app.use(bodyParser.json());

// Endpoints
router.get('/orders', async (req, res) => {
  try {
    const response = await axios.get(`${Config.ORDER_SERVICE}/orders/`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

router.get('/orders/:id', async (req, res) => {
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

router.post('/orders', async (req, res) => {
  try {
    const response = await axios.post(`${Config.ORDER_SERVICE}/orders/`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

router.patch('/orders/:id', async (req, res) => {
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

router.delete('/orders/:id', async (req, res) => {
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
router.post('/confirm-order', async (req, res) => {
  const orderData = req.body;

  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    if (!subscriber.isOpen) {
      await subscriber.connect();
    }
    console.log("connected");

    // Process order confirmation request
    // Check order is confirmed or not in here
    const response = await axios.get(`${Config.ITEM_SERVICE}/items/instock/${itemId}`);
    const item = response.data;
    if (item) {
      console.log(`Item ${item.name} is in stock.`);
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
      subscriber.subscribe('delivery-response', (message) => {
        console.log(message);
        const deliveryData = JSON.parse(message);
        // Process delivery response and send notification
        const deliveryMessage = deliveryData.message;
  
        if (deliveryMessage === 'Delivery successful') {
          sendEmailMiddleware({ params: { emailType: 'deliverySuccess' }, body: { buyerEmail: deliveryData.buyerEmail } });
        } else {
          sendEmailMiddleware({ params: { emailType: 'deliveryFailed' }, body: { buyerEmail: deliveryData.buyerEmail } });
        } // 'message'
      });
      subscriber.subscribe('payment-response', (message) => {
        console.log(message);
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
        } // 'message'
      });
      res.status(200).send('Order confirmed successfully');
    } else {
      res.status(200).send('Item is out of stock');
    }
    // Determine payment type and send payment request
  } catch (error) {
    console.error(error);
    res.status(500).send('Error confirming order');
  }
});



module.exports = router;