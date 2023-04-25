const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const startRedisSubscriber = require('./middleware/startRedisSubscriber');

// Middleware
app.use(bodyParser.json());


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

startRedisSubscriber();

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
