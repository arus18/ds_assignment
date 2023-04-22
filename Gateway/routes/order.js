const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const router = express.Router();

// Middleware
app.use(bodyParser.json());

// Endpoints
app.get('/orders', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/orders');
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
    const response = await axios.get(`http://localhost:3000/orders/${orderId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3000/orders', req.body);
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
    const response = await axios.patch(`http://localhost:3000/orders/${orderId}`, req.body);
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
    const response = await axios.delete(`http://localhost:3000/orders/${orderId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;
