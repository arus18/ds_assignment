const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  seller_id: {
    type: String,
    required: true
  },
  image_urls: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
