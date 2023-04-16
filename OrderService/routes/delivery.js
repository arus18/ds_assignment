const express = require('express');
const Delivery = require('../models/delivery');
const router = express.Router();

// CREATE a new delivery
router.post('/', async (req, res) => {
  try {
    const delivery = new Delivery(req.body);
    const result = await delivery.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// READ all deliveries
router.get('/', async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// READ a single delivery by ID
router.get('/:id', async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      res.status(404).json({ error: 'Delivery not found' });
      return;
    }
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE a delivery by ID
router.put('/:id', async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!delivery) {
      res.status(404).json({ error: 'Delivery not found' });
      return;
    }
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a delivery by ID
router.delete('/:id', async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      res.status(404).json({ error: 'Delivery not found' });
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
