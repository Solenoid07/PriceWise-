const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  prices: [{
    store: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    url: {
      type: String
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);