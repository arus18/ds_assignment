const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true
  },
  delivery_service: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Delivered'],
    default: 'Pending'
  }
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
