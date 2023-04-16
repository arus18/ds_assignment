const express = require('express');
const router = express.Router();
const ItemReview = require('../models/itemReview');

// CREATE item review
router.post('/', async (req, res) => {
  try {
    const { item_id, buyer_id, review } = req.body;
    const itemReview = new ItemReview({ item_id, buyer_id, review });
    const savedItemReview = await itemReview.save();
    res.json(savedItemReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ all item reviews
router.get('/', async (req, res) => {
  try {
    const itemReviews = await ItemReview.find();
    res.json(itemReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ one item review by ID
router.get('/:id', async (req, res) => {
  try {
    const itemReview = await ItemReview.findById(req.params.id);
    if (!itemReview) {
      return res.status(404).json({ error: 'Item review not found' });
    }
    res.json(itemReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE one item review by ID
router.put('/:id', async (req, res) => {
  try {
    const { item_id, buyer_id, review } = req.body;
    const updatedItemReview = await ItemReview.findByIdAndUpdate(
      req.params.id,
      { item_id, buyer_id, review },
      { new: true }
    );
    if (!updatedItemReview) {
      return res.status(404).json({ error: 'Item review not found' });
    }
    res.json(updatedItemReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE one item review by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedItemReview = await ItemReview.findByIdAndDelete(req.params.id);
    if (!deletedItemReview) {
      return res.status(404).json({ error: 'Item review not found' });
    }
    res.json(deletedItemReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
