// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceRequested: { type: String, required: true },
  budget: { type: Number },
  location: { type: String },
  urgency: { type: String },
  matchedProviders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  contactedProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
