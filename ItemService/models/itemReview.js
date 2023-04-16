const mongoose = require('mongoose');

const itemReviewSchema = new mongoose.Schema({
  item_id: {
    type: String,
    required: true
  },
  buyer_id: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ItemReview', itemReviewSchema);
