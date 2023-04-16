const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');

// GET all sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

// GET a single seller by ID
router.get('/:id', async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).send({ message: 'Seller not found' });
    }
    res.json(seller);
  } catch (err) {
    res.status(500).send(err);
  }
});

// CREATE a new seller
router.post('/', async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.json(seller);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE a seller by ID
router.put('/:id', async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!seller) {
      return res.status(404).send({ message: 'Seller not found' });
    }
    res.json(seller);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE a seller by ID
router.delete('/:id', async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) {
      return res.status(404).send({ message: 'Seller not found' });
    }
    res.json({ message: 'Seller deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
