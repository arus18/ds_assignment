const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// Get one order
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// Create one order
router.post('/', async (req, res) => {
  const order = new Order({
    item_id: req.body.item_id,
    buyer_id: req.body.buyer_id,
    seller_id: req.body.seller_id,
    quantity: req.body.quantity,
    status: req.body.status,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

// Update one order
router.patch('/:id', getOrder, async (req, res) => {
  if (req.body.item_id != null) {
    res.order.item_id = req.body.item_id;
  }

  if (req.body.buyer_id != null) {
    res.order.buyer_id = req.body.buyer_id;
  }

  if (req.body.seller_id != null) {
    res.order.seller_id = req.body.seller_id;
  }

  if (req.body.quantity != null) {
    res.order.quantity = req.body.quantity;
  }

  if (req.body.status != null) {
    res.order.status = req.body.status;
  }

  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

// Delete one order
router.delete('/:id', getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({
      message: 'Order deleted'
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// Middleware function to get a single order by ID
async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }
    res.order = order;
    order.remove = async function () {
      try {
        await Order.findByIdAndDelete(this._id);
      } catch (err) {
        throw new Error(err.message);
      }
    };
    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

module.exports = router;