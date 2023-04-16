const mongoose = require('mongoose');
const { Schema } = mongoose;

const buyerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/ // regex to validate email format
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Buyer', buyerSchema);
