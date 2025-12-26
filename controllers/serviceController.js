// controllers/serviceController.js
const { validationResult } = require('express-validator');
const Service = require('../models/Service');

exports.createService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const payload = { ...req.body, provider: req.user.id };
    if (req.files?.images) payload.images = req.files.images.map(f => `/uploads/${f.filename}`);
    if (req.files?.samples) payload.samples = req.files.samples.map(f => `/uploads/${f.filename}`);
    const service = await Service.create(payload);
    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, provider: req.user.id },
      req.body,
      { new: true }
    );
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listServices = async (req, res) => {
  try {
    const query = { status: 'approved' };
    if (req.query.category) query.categories = req.query.category;
    const services = await Service.find(query).populate('provider', 'name location');
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('provider', 'name location');
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
