const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const MONGO_URI = process.env.MONGO_URI + "/maindb";
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const itemRouter = require('./routes/item');
const itemReviewController = require('./routes/itemReview');
app.use('/items', itemRouter);
app.use('/item-reviews', itemReviewController);
app.get("/health", (req, res) => {
  res.json({
    message: "Item service is fine. 👌",
    time: new Date()
  })
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));