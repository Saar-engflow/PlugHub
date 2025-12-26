// models/Service.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const serviceSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: String, required: true }],
  items: [itemSchema],
  availability: {
    days: [{ type: String }], // ["Mon", "Tue", ...]
    startTime: { type: String }, // "09:00"
    endTime: { type: String } // "17:00"
  },
  serviceArea: { type: String },
  images: [{ type: String }],
  samples: [{ type: String }],       // optional
  pastClients: [{ type: String }],   // optional
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
