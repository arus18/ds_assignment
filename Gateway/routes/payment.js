const express = require('express');
const axios = require('axios');
const router = express.Router();
const Config = require('../config');

const paymentsUrl = `${Config.ORDER_SERVICE}/payments/`;

// Create a new payment
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(paymentsUrl, req.body);
    res.status(201).json(response.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all payments
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(paymentsUrl);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single payment
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${paymentsUrl}${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a payment
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.patch(`${paymentsUrl}${id}`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a payment
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.delete(`${paymentsUrl}${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
