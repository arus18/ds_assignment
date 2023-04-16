const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

// Create a new payment
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single payment
router.get('/:id', getPayment, (req, res) => {
  res.json(res.payment);
});

// Update a payment
router.patch('/:id', getPayment, async (req, res) => {
  if (req.body.vendor != null) {
    res.payment.vendor = req.body.vendor;
  }
  if (req.body.payment != null) {
    res.payment.payment = req.body.payment;
  }
  if (req.body.status != null) {
    res.payment.status = req.body.status;
  }
  try {
    const updatedPayment = await res.payment.save();
    res.json(updatedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a payment
router.delete('/:id', getPayment, async (req, res) => {
  try {
    await res.payment.remove();
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPayment(req, res, next) {
  let payment;
  try {
    payment = await Payment.findById(req.params.id);
    if (payment == null) {
      return res.status(404).json({ message: 'Payment not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.payment = payment;
  payment.remove = async function () {
    try {
      await Payment.findByIdAndDelete(this._id);
    } catch (err) {
      throw new Error(err.message);
    }
  };
  next();
}

module.exports = router;
