// models/Service.js
const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
});

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: String, required: true }],
  prices: [priceSchema],
  availability: {
    days: [{ type: String }],
    hours: { type: String }
  },
  serviceArea: { type: String },
  images: [{ type: String }],
  samples: [{ type: String, required: false }],       // optional
  pastClients: [{ type: String, required: false }],   // optional
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number },
    comment: { type: String }
  }],
  reviewsCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
