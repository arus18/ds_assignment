const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const router = express.Router();
const Config = require('../config');

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

module.exports = router;
