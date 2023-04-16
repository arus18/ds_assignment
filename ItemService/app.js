const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/itemdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const itemRouter = require('./routes/item');
const itemReviewController = require('./routes/itemReview');
app.use('/items', itemRouter);
app.use('/item-reviews', itemReviewController);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));