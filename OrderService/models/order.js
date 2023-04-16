const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  item_id: {
    type: String,
    required: true,
  },
  buyer_id: {
    type: String,
    required: true,
  },
  seller_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
