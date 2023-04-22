const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
const combinedController = require('./routes/notification');
app.use('/api', combinedController);

// Start server
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening on port ${port}...`));
