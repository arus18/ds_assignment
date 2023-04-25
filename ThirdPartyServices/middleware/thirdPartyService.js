const redis = require('redis');

const startRedisSubscriber = () => {
  const subscriber = redis.createClient();
  
  subscriber.on('message', (channel, message) => {
    if (channel === 'delivery-request') {
      // Add delivery request logic here
      const {
        orderId,
        deliveryService
      } = JSON.parse(message);
    
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
    
      // Process delivery request and send response
      const deliveryResponse = {
        orderId: orderId,
        message: success ? 'Delivery successful' : 'Delivery failed',
        buyerEmail: 'buyer@example.com' // Replace with actual buyer email from order data
      };
      const deliveryResponseString = JSON.stringify(deliveryResponse);
      const publisher = redis.createClient();
      publisher.publish('delivery-response', deliveryResponseString);
      publisher.quit();
    } else if (channel === 'payment-request') {
      const {
        orderId,
        paymentMethod
      } = JSON.parse(message);
    
      // Simulate random delay in payment processing
      const delay = Math.floor(Math.random() * 50000) + 10000; // Random delay between 10-60 seconds
      await new Promise(resolve => setTimeout(resolve, delay));
    
      // Simulate random payment success or failure
      const success = Math.random() < 0.5; // Random boolean value
      const status = success ? 'paid' : 'failed';
    
      // Create payment object
      const payment = {
        orderId,
        paymentMethod,
        status,
        timestamp: new Date()
      };
    
      // Process payment request and send response
      const paymentResponse = {
        orderId: orderId,
        message: success ? 'Payment successful' : 'Payment failed',
        buyerEmail: 'buyer@example.com' // Replace with actual buyer email from order data
      };
      const paymentResponseString = JSON.stringify(paymentResponse);
      const publisher = redis.createClient();
      publisher.publish('payment-response', paymentResponseString);
      publisher.quit();
    }
  });
  
  subscriber.subscribe('delivery-request');
  subscriber.subscribe('payment-request');
};


module.exports = startRedisSubscriber;