const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/order');
const deliveryRoutes = require('./routes/delivery');
const paymentRoutes = require('./routes/payment');

const app = express();
const port = process.env.PORT || 3000;

// Set up body parser middleware
app.use(bodyParser.json());

// Set up MongoDB connection
mongoose.connect('mongodb://localhost:27017/orderdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Define routes for the order model
app.use('/orders', orderRoutes);

// Define routes for the delivery model
app.use('/deliveries', deliveryRoutes);

// Define routes for the payment model
app.use('/payments', paymentRoutes);

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
