const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true
  },
  vendor: {
    type: String,
    required: true
  },
  payment: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
