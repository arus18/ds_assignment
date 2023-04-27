const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// CREATE
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) throw new Error('Item not found');
    res.json(item);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

// UPDATE
router.patch('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body, {
        new: true
      }
    );
    if (!updatedItem) throw new Error('Item not found');
    res.json(updatedItem);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) throw new Error('Item not found');
    res.json(deletedItem);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.get('/instock/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const item = await Item.findOne({ _id: itemId, quantity: { $gt: 0 } });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found or out of stock.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;