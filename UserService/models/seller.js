const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  store_name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
