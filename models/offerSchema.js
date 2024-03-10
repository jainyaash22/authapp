const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for offers
const offerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Create model for offers
const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
