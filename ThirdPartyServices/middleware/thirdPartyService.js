const redis = require('redis');

const startRedisSubscriber = async () => {
  console.log("subscriber started");
  const subscriber = redis.createClient('redis://localhost:6379');
  const publisher = redis.createClient('redis://localhost:6379');
  if (!subscriber.isOpen) {
    await subscriber.connect();
  }
  if (!publisher.isOpen) {
    await publisher.connect();
  }
  console.log("connected");
  subscriber.subscribe('delivery-request',async (message) => {
    console.log(message);
    // Add delivery request logic here
    console.log("delivery request");
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
      buyerEmail: 'nazeer.arus18@gmail.com' // Replace with actual buyer email from order data
    };
    const deliveryResponseString = JSON.stringify(deliveryResponse)
    publisher.publish('delivery-response', deliveryResponseString); // 'message'
  });

  subscriber.subscribe('payment-request',async (message) => {
    const {
      orderId,
      paymentMethod
    } = JSON.parse(message);
  
    // Simulate random delay in payment processing
    const delay = Math.floor(Math.random() * 50000) + 10000; // Random delay between 10-60 seconds
    //await new Promise(resolve => setTimeout(resolve, delay));
  
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
      buyerEmail: 'nazeer.arus18@gmail.com' // Replace with actual buyer email from order data
    };
    const paymentResponseString = JSON.stringify(paymentResponse);
    publisher.publish('payment-response', paymentResponseString);
  });
};


module.exports = startRedisSubscriber;