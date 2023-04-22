const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
const sellerRoutes = require('./routes/seller');
const buyerRoutes = require('./routes/buyer');
app.use('/seller', sellerRoutes);
app.use('/buyer',buyerRoutes);

// Start the server
const port = process.env.PORT || 3006;
app.listen(port, () => console.log(`Listening on port ${port}...`));
