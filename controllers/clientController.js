// controllers/clientController.js
const { validationResult } = require('express-validator');
const Request = require('../models/Request');
const Service = require('../models/Service');
const rankServices = require('../utils/recommendation');

exports.createRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const request = await Request.create({ ...req.body, client: req.user.id });
    const services = await Service.find({ status: 'approved' });
    const ranked = rankServices(services, req.body).slice(0, 5);
    request.matchedProviders = ranked.map(s => s._id);
    await request.save();
    res.status(201).json({ request, ranked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.contactProvider = async (req, res) => {
  try {
    const request = await Request.findOne({ _id: req.params.id, client: req.user.id });
    if (!request) return res.status(404).json({ message: 'Request not found' });
    request.contactedProvider = req.body.serviceId;
    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
